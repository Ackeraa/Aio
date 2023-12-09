class Comment < ApplicationRecord
  belongs_to :creator, class_name: 'User'
  belongs_to :commentable, polymorphic: true

  acts_as_tree order: 'created_at DESC'

  def self.search(source, query, page)
    source = source.downcase if source

    return null_result unless source
    return base_search(Comment.all, query, page) if source == 'all'
    base_search(Comment.where(source: source), query, page)
  end

  private_class_method
  
  def self.null_result
    { total: 0, comments: [] }
  end

  def self.base_search(scope, query, page, per_page=20)
    conditions = "description ILIKE '%#{query}%'" if query.present?

    total = scope.where(conditions).count
    comments = scope.where(conditions)
                 .order("updated_at DESC")
                 .offset(page * per_page).limit(per_page).hash_tree(limit_depth: 5)

    { total: total, comments: comments_tree_for(comments) }
  end

  def self.comments_tree_for(comments)
    comments.map do |comment, nested_comments|
      {
        comment: comment,
        children: comments_tree_for(nested_comments) 
      }
    end
  end
end
