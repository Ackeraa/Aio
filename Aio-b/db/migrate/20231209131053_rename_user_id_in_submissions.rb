class RenameUserIdInSubmissions < ActiveRecord::Migration[7.0]
  def change
    rename_column :submissions, :user_id, :submitter_id
  end
end
