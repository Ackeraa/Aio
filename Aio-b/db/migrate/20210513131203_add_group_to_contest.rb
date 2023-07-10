class AddGroupToContest < ActiveRecord::Migration[6.0]
  def change
    add_reference :contests, :group, null: false, foreign_key: true, default: 0
  end
end
