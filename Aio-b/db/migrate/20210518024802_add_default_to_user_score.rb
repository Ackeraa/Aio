class AddDefaultToUserScore < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :score, :string, default: 0
  end
end
