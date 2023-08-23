class Comment < ApplicationRecord

  belongs_to :creator, class_name: 'User'
  acts_as_tree order: 'created_at DESC'

  def self.search(source, query, page)
    source = source.downcase if source

    statements = []
    statements << "source = '#{source}'" if source.present? && source != 'all'
    statements << "description ILIKE '%#{query}%'" if query.present?

    conditions = [statements.join(' AND ')]
  
    base_search(self, conditions, page)
  end

  private_class_method def self.base_search(scope, conditions, page, per_page=20)
    total = scope.where(conditions).count
    comments = scope.where(conditions)
                 .order("updated_at DESC")
                 .offset(page * per_page).limit(per_page).hash_tree(limit_depth: 5)

    { total: total, comments: comments_tree_for(comments) }
  end

  private_class_method def self.comments_tree_for(comments)
    comments.map do |comment, nested_comments|
      {
        comment: comment,
        children: comments_tree_for(nested_comments) 
      }
    end
  end
end
