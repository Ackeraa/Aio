class CreateCostScores < ActiveRecord::Migration[6.0]
  def change
    create_table :cost_scores do |t|
      t.string :action
      t.integer :score

      t.timestamps
    end
  end
end
