class AddPreviousTasktoTask < ActiveRecord::Migration
  def change
    add_column :tasks, :previous_task_id, :integer
  end
end
