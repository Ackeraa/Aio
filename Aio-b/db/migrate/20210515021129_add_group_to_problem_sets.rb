class AddGroupToProblemSets < ActiveRecord::Migration[6.0]
  def change
    add_reference :problem_sets, :group, null: false, foreign_key: true, default: 0
  end
end
