class RenameContestAnnouncement < ActiveRecord::Migration[7.0]
  def change
    rename_table :contest_announcements, :announcements
  end
end
