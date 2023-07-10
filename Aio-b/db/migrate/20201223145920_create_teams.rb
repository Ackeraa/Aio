class CreateTeams < ActiveRecord::Migration[6.0]
  def change
    create_table :teams do |t|
      t.string :name
      t.string :password
      t.string :type
      t.jsonb :member1
      t.jsonb :member2
      t.jsonb :member3
      t.references :group, null: false, foreign_key: true

      t.timestamps
    end
  end
end
