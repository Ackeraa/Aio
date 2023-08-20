class ChangeCreatorIdType < ActiveRecord::Migration[7.0]
  def change
    change_column :problems, :creator_id, :bigint
    change_column :contests, :creator_id, :bigint
    change_column :problem_sets, :creator_id, :bigint
    change_column :groups, :creator_id, :bigint
    change_column :contest_announcements, :creator_id, :bigint
  end
end
