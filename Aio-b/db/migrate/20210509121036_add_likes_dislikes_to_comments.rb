class AddLikesDislikesToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :likes, :jsonb, default: { votes: 0, voters: [] }
    add_column :comments, :dislikes, :jsonb, default: { votes: 0, voters: [] }
  end
end
