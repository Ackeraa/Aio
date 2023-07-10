class CreateContestAnnouncements < ActiveRecord::Migration[6.0]
  def change
    create_table :contest_announcements do |t|
      t.string :creater
      t.string :name
      t.text :description
      t.boolean :visible
      t.references :contest, null: false, foreign_key: true

      t.timestamps
    end
  end
end
