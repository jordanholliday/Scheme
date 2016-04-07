class AddNextTaskIdtoTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :next_task_id, :integer
  end
end
