class CreateContestProblems < ActiveRecord::Migration[6.0]
  def change
    create_table :contest_problems do |t|
      t.belongs_to :contest, index: true
      t.belongs_to :problem, index: true
      t.text :description
      t.text :input
      t.text :output
      t.text :hint
      t.jsonb :samples
      t.timestamps
    end
  end
end
