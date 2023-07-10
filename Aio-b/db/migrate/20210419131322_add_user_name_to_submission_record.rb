class AddUserNameToSubmissionRecord < ActiveRecord::Migration[6.0]
  def change
    add_column :submission_records, :user_name, :string
  end
end
