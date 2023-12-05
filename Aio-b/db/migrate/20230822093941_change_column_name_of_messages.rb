class ChangeColumnNameOfMessages < ActiveRecord::Migration[7.0]
  def change
    rename_column :messages, :from, :sender_id
    rename_column :messages, :to, :receiver_ids
  end
end
