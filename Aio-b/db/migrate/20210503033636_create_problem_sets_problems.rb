class CreateProblemSetsProblems < ActiveRecord::Migration[6.0]
  def change
    create_table :problem_sets_problems do |t|
      t.references :problem_set, null: false, foreign_key: true
      t.references :problem, null: false, foreign_key: true
    end
  end
end
