class ChangeCreaterToCreator < ActiveRecord::Migration[7.0]
  def change
    rename_column :contests, :creater, :creator
    rename_column :groups, :creater, :creator
    rename_column :problems, :creater, :creator
    rename_column :problem_sets, :creater, :creator
    rename_column :contest_announcements, :creater, :creator
  end
end
