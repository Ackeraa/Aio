class CreateAuthPermissionsUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :auth_permissions_users do |t|
      t.references :user, null: false, foreign_key: true
      t.references :auth_permission, null: false, foreign_key: true
    end
  end
end
