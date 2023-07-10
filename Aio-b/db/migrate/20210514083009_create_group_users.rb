class CreateGroupUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :group_users do |t|
      t.belongs_to :group, index: true
      t.belongs_to :user, index: true
      t.string :role
      t.timestamps
    end
  end
end
