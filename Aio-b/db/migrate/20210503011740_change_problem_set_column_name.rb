class ChangeProblemSetColumnName < ActiveRecord::Migration[6.0]
  def change
    rename_column :problem_sets, :name, :title
  end
end
