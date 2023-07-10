class CreateContestsProblems < ActiveRecord::Migration[6.0]
  def change
    create_table :contests_problems do |t|
      t.references :contest, null: false, foreign_key: true
      t.references :problem, null: false, foreign_key: true
    end
  end
end
