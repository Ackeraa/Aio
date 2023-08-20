class AddIsHandledToMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :is_handled, :boolean, default: false
  end
end
