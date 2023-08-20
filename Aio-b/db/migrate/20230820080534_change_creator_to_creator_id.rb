class ChangeCreatorToCreatorId < ActiveRecord::Migration[7.0]
  def change
    change_table :contests do |t|
      t.remove :creator
      t.integer :creator_id
      t.index :creator_id
      t.foreign_key :users, column: :creator_id
    end

    change_table :groups do |t|
      t.remove :creator
      t.integer :creator_id
      t.index :creator_id
      t.foreign_key :users, column: :creator_id
    end

    change_table :problems do |t|
      t.remove :creator
      t.integer :creator_id
      t.index :creator_id
      t.foreign_key :users, column: :creator_id
    end

    change_table :problem_sets do |t|
      t.remove :creator
      t.integer :creator_id
      t.index :creator_id
      t.foreign_key :users, column: :creator_id
    end

    change_table :contest_announcements do |t|
      t.remove :creator
      t.integer :creator_id
      t.index :creator_id
      t.foreign_key :users, column: :creator_id
    end

  end
end
