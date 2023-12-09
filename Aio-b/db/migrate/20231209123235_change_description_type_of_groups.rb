class ChangeDescriptionTypeOfGroups < ActiveRecord::Migration[7.0]
  def change
    change_column :groups, :description, :text
  end
end
