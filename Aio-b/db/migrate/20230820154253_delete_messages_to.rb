class DeleteMessagesTo < ActiveRecord::Migration[7.0]
  def change
    remove_column :messages, :to
  end
end
