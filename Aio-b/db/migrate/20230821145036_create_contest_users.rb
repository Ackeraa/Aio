class CreateContestUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :contest_users do |t|
      t.jsonb :submission_info
      t.references :user, null: false, foreign_key: true
      t.references :contest, null: false, foreign_key: true

      t.timestamps
    end
  end
end
