class CreateAuthPermissions < ActiveRecord::Migration[6.0]
  def change
    create_table :auth_permissions do |t|
      t.string :name
      t.integer :type_id

      t.timestamps
    end
  end
end
