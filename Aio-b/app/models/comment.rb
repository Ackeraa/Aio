class Comment < ApplicationRecord
  belongs_to :creator, class_name: 'User'
  acts_as_tree order: 'created_at DESC'

  def self.search(source, query, page)
    source = source.downcase if source

    statements = []
    statements << "source = '#{source}'" if source.present? && source != 'all'
    statements << "description ilike '%#{query}%'" if query.present?

    condition = [statements.join(' and ')]
  
    total = Comment.where(condition).count
    comments = Comment.where(condition)
                      .limit(20).offset(page * 20).hash_tree(limit_depth: 5)
                      
    { total: total, comments: comments_tree_for(comments) }
  end

  private

  def self.comments_tree_for(comments)
    comments.map do |comment, nested_comments|
      {
        comment: comment,
        children: comments_tree_for(nested_comments) 
      }
    end
  end
end
