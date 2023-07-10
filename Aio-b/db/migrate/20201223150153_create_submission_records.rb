class CreateSubmissionRecords < ActiveRecord::Migration[6.0]
  def change
    create_table :submission_records do |t|
      t.string :user_name
      t.string :result
      t.text :code
      t.integer :memory_usage
      t.integer :time_usage
      t.integer :solution_size
      t.date :submit_time
      t.references :problem, null: false, foreign_key: true

      t.timestamps
    end
  end
end
