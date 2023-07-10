class CreateProblemSets < ActiveRecord::Migration[6.0]
  def change
    create_table :problem_sets do |t|
      t.string :creater
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
