class AddPictureToItems < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :picture, :string
  end
end
