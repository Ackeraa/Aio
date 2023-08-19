class AddPhotoToGroups < ActiveRecord::Migration[7.0]
  def change
    add_column :groups, :photo, :string
  end
end
