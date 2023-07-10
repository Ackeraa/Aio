class DropSubmissionRecords < ActiveRecord::Migration[6.0]
  def change
    drop_table :submission_records
  end
end
