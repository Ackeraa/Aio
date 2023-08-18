class AddGithubToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :github, :string
  end
end
