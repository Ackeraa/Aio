class ApplyPolymorphicForComment < ActiveRecord::Migration[7.0]
  def change
    add_column :comments, :commentable_type, :string
    add_column :comments, :commentable_id, :integer
    add_index :comments, [:commentable_type, :commentable_id]
  end
end
