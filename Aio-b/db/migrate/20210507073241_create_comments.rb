class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.integer :parent_id
      t.string :creator
      t.text :description
      t.integer :likes
      t.references :problem, null: false, foreign_key: true

      t.timestamps
    end
  end
end
