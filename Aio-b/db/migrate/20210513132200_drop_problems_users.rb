class DropProblemsUsers < ActiveRecord::Migration[6.0]
  def change
    drop_table :problems_users
  end
end
