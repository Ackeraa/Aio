class CreateProblemsProblemSets < ActiveRecord::Migration[6.0]
  def change
    create_table :problems_problem_sets do |t|
      t.references :problem_set, null: false, foreign_key: true
      t.references :problem, null: false, foreign_key: true
    end
  end
end
