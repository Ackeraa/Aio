class CreateOiContestRanks < ActiveRecord::Migration[6.0]
  def change
    create_table :oi_contest_ranks do |t|
      t.integer :submissions
      t.integer :accepts
      t.integer :time
      t.jsonb :submission_info
      t.references :contest, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
