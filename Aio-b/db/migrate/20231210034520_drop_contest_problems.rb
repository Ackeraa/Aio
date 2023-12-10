class DropContestProblems < ActiveRecord::Migration[7.0]
  def change
    drop_table :contest_problems
  end
end
