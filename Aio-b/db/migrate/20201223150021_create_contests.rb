class CreateContests < ActiveRecord::Migration[6.0]
  def change
    create_table :contests do |t|
      t.string :creater
      t.string :name
      t.text :description
      t.date :start_time
      t.date :end_time
      t.string :rule_type
      t.string :password
      t.boolean :visible
      
      t.timestamps
    end
  end
end
