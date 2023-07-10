class ChangeProblemSetTitleName < ActiveRecord::Migration[6.0]
  def change
    rename_column :problem_sets, :title, :name
  end
end
