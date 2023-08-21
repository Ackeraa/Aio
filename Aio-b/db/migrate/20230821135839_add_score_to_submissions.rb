class AddScoreToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :score, :integer, default: 0
  end
end
