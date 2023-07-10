class RemoveUserNameFromSubmissionRecords < ActiveRecord::Migration[6.0]
  def change
    remove_column :submission_records, :user_name, :string
  end
end
