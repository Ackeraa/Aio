class ChangeProblemTemplateName < ActiveRecord::Migration[6.0]
  def change
    rename_column :problems, :templete, :template
  end
end
