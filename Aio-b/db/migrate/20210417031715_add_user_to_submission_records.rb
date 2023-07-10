class AddUserToSubmissionRecords < ActiveRecord::Migration[6.0]
  def change
    add_reference :submission_records, :user, null: false, foreign_key: true
  end
end
