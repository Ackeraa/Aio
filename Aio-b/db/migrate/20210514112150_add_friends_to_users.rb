class AddFriendsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :followers, :jsonb, default: []
    add_column :users, :following, :jsonb, default: []
  end
end
