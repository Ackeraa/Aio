class ChangeContestsDateType < ActiveRecord::Migration[6.0]
  def change
    change_column :contests, :start_time, :datetime
    change_column :contests, :end_time, :datetime
  end
end
