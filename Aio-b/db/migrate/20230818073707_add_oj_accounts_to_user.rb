class AddOjAccountsToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :oj_accounts, :jsonb, default: {}
  end

end
