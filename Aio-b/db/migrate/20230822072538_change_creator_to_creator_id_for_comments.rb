class ChangeCreatorToCreatorIdForComments < ActiveRecord::Migration[7.0]
  def change
    remove_column :comments, :creator
    add_column :comments, :creator_id, :bigint
    add_index :comments, :creator_id
    add_foreign_key :comments, :users, column: :creator_id
  end
end
