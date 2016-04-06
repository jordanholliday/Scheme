class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name, null: false
      t.string :description
      t.integer :team_id, null:false
      t.boolean :archived, null: false, default: false
      t.timestamps null: false
    end

    add_index :projects, :team_id
  end
end
