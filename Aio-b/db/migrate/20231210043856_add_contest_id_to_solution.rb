class AddContestIdToSolution < ActiveRecord::Migration[7.0]
  def change
    add_reference :solutions, :contest, foreign_key: true
  end
end
