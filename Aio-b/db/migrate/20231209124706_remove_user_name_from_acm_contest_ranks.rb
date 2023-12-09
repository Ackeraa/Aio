class RemoveUserNameFromAcmContestRanks < ActiveRecord::Migration[7.0]
  def change
    remove_column :acm_contest_ranks, :user_name, :string
  end
end
