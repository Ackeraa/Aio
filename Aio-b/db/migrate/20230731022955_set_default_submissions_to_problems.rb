class SetDefaultSubmissionsToProblems < ActiveRecord::Migration[7.0]
  def change
    change_column_default :problems, :submissions, 0
  end
end
