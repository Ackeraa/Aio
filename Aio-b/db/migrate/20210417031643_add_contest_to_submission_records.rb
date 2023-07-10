class AddContestToSubmissionRecords < ActiveRecord::Migration[6.0]
  def change
    add_reference :submission_records, :contest, null: false, foreign_key: true
  end
end
