class CreateProblemsUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :problems_users do |t|
      t.references :user, null: false, foreign_key: true
      t.references :problem, null: false, foreign_key: true
      t.string :result
    end
  end
end
