class CreateOiContestRanksContests < ActiveRecord::Migration[6.0]
  def change
    create_table :oi_contest_ranks_contests do |t|
      t.references :contest, null: false, foreign_key: true
      t.references :oi_contest_rank, null: false, foreign_key: true
    end
  end
end
