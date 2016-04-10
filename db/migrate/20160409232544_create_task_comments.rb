class CreateTaskComments < ActiveRecord::Migration
  def change
    create_table :task_comments do |t|
      t.string :body
      t.integer :task_id
      t.integer :user_id
      t.timestamps null: false
    end
  end
end
