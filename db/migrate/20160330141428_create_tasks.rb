class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :description
      t.date :deadline
      t.string :repeats
      t.boolean :completed, default: false
      t.integer :parent_id
      t.integer :assignee_id
      t.integer :creator_id, null: false
      t.timestamps null: false
    end
  end
end
