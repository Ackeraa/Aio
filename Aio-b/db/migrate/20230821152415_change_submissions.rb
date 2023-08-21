class ChangeSubmissions < ActiveRecord::Migration[7.0]
  def change
    remove_column :submissions, :time_usage, :integer
    remove_column :submissions, :memory_usage, :integer
    remove_column :submissions, :result, :string
    remove_column :submissions, :score, :integer
    add_column :submissions, :results, :jsonb, default: {}
  end
end
