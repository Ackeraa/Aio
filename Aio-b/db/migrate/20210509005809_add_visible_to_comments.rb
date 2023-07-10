class AddVisibleToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :is_visible, :boolean, default: false
  end
end
