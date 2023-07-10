class CreateTeamContestRanks < ActiveRecord::Migration[6.0]
  def change
    create_table :team_contest_ranks do |t|
      t.integer :submissions
      t.integer :accepts
      t.integer :time
      t.json :submission_info
      t.references :contest, null: false, foreign_key: true
      t.references :team, null: false, foreign_key: true

      t.timestamps
    end
  end
end
