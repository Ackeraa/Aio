class CreateSubmissions < ActiveRecord::Migration[6.0]
  def change
    create_table :submissions do |t|
      t.string :result
      t.text :code
      t.integer :memory_usage
      t.integer :time_usage
      t.integer :solution_size
      t.references :problem, null: false, foreign_key: true
      t.references :contest, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
