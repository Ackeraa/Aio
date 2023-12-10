class DropRankTable < ActiveRecord::Migration[7.0]
  def change
    drop_table :acm_contest_ranks
    drop_table :oi_contest_ranks
  end
end
