class FixDefaultToUserScore < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :score
    add_column :users, :score, :integer, default: 0
  end
end
