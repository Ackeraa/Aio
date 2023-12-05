class ChangeWhichToSourceForComments < ActiveRecord::Migration[7.0]
  def change
    rename_column :comments, :which, :source
  end
end
