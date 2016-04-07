class AddLastTaskToProjct < ActiveRecord::Migration
  def change
    add_column :projects, :last_task_id, :integer
  end
end
