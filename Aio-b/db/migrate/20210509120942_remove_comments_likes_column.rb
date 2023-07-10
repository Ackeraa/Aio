class RemoveCommentsLikesColumn < ActiveRecord::Migration[6.0]
  def change
    remove_column :comments, :likes
  end
end
