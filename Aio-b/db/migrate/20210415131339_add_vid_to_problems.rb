class AddVidToProblems < ActiveRecord::Migration[6.0]
  def change
    add_column :problems, :vid, :string
  end
end
