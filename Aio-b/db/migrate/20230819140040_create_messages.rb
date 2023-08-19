class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.string :category
      t.integer :from
      t.integer :to
      t.string :arg1

      t.timestamps
    end
  end
end
