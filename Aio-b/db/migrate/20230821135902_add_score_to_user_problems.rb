class AddScoreToUserProblems < ActiveRecord::Migration[7.0]
  def change
    add_column :user_problems, :score, :integer, default: 0
  end
end
