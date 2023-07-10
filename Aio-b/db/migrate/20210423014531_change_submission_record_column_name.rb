class ChangeSubmissionRecordColumnName < ActiveRecord::Migration[6.0]
  def change
    rename_column :submission_records, :solution_size, :code_size
  end
end
