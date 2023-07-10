class CreateProblems < ActiveRecord::Migration[6.0]
  def change
    create_table :problems do |t|
      t.string :token
      t.string :creater
      t.string :name
      t.text :description
      t.text :input
      t.text :output
      t.text :hint
      t.string :source
      t.integer :time_limit
      t.integer :memory_limit
      t.string :difficulty
      t.jsonb :tags
      t.jsonb :samples
      t.string :data
      t.jsonb :data_score
      t.jsonb :allowed_languages
      t.string :templete
      t.string :spj
      t.string :rule_type
      t.boolean :is_visible
      t.integer :submissions
      t.integer :accepts

      t.timestamps
    end
  end
end
