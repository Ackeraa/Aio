class SetDefaultAcceptsToProblems < ActiveRecord::Migration[7.0]
  def change
    change_column_default :problems, :accepts, 0
  end
end
