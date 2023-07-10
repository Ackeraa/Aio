class AddNameColumnToAcmContestRank < ActiveRecord::Migration[6.0]
  def change
    add_column :acm_contest_ranks, :user_name, :string
  end
end
