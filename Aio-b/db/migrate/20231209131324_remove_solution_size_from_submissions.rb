class RemoveSolutionSizeFromSubmissions < ActiveRecord::Migration[7.0]
  def change
    remove_column :submissions, :solution_size, :integer
  end
end
