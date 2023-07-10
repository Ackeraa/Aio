class ChangeContestVisibleName < ActiveRecord::Migration[6.0]
  def change
    rename_column :contests, :visible, :is_visible
  end
end
