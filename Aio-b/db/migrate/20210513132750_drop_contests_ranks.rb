class DropContestsRanks < ActiveRecord::Migration[6.0]
  def change
    drop_table :acm_contest_ranks_contests
    drop_table :oi_contest_ranks_contests
    drop_table :team_contest_ranks_contests
  end
end
