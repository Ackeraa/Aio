class ChangeCommentLikesDislikes < ActiveRecord::Migration[6.0]
  def change
    change_column :comments, :likes, :jsonb, default: { :votes => 0, :voters => [] }
    change_column :comments, :dislikes, :jsonb, default: { :votes => 0, :voters => [] }
  end
end
