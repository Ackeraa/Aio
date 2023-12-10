class DropItemTable < ActiveRecord::Migration[7.0]
  def change
    drop_table :items
  end
end
