class CreateUserProblems < ActiveRecord::Migration[6.0]
  def change
    create_table :user_problems do |t|
      t.belongs_to :user, index: true
      t.belongs_to :problem, index: true
      t.string :result
      t.timestamps
    end
  end
end
