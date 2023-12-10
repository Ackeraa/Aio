class RenameSomeTable < ActiveRecord::Migration[7.0]
  def change
    rename_table :group_users, :group_members
    rename_table :user_problems, :problem_records
    rename_table :contest_users, :contest_records
  end
end
