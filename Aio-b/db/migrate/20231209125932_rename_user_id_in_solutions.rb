class RenameUserIdInSolutions < ActiveRecord::Migration[7.0]
  def change
    rename_column :solutions, :user_id, :creator_id
  end
end
