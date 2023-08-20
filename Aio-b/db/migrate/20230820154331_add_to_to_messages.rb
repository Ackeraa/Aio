class AddToToMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :to, :bigint, array: true, default: []
  end
end
