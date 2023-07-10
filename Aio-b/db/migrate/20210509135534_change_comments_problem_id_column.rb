class ChangeCommentsProblemIdColumn < ActiveRecord::Migration[6.0]
  def change
    remove_column :comments, :problem_id
    add_column :comments, :which, :string
  end
end
