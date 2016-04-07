class Project < ActiveRecord::Base
  validates :name, :team_id, presence: true

  belongs_to :team

  has_many(
    :users,
    through: :team,
    source: :members
  )

  has_many :tasks

  def self.reorder_tasks(move_task, in_front_of_task)
    return "not same project" unless move_task.project == in_front_of_task.project
    if move_task.next_task_id
      next_task = move_task.next_task
      next_task.previous_task_id = move_task.previous_task_id
      next_task.save!
    end

    if move_task.previous_task_id
      previous_task = move_task.previous_task
      previous_task.next_task_id = move_task.next_task_id
      previous_task.save!

      if !previous_task.next_task_id
        this_project = previous_task.project
        this_project.last_task_id = previous_task.id
        this_project.save!
      end
    end

    move_task.previous_task_id = in_front_of_task.previous_task_id
    move_task.next_task_id = in_front_of_task.id
    in_front_of_task.previous_task_id = move_task.id

    move_task.save!
    in_front_of_task.save!
  end

  def sort_tasks
    task_hash = {}

    self.tasks.includes(:creator).each do |task|
      task_hash[task.id] = task
    end

    task_arr = [task_hash[self.last_task_id]]

    while task_arr.first.previous_task_id
      previous_task = task_hash[task_arr.first.previous_task_id]
      task_arr.unshift(previous_task)
    end

    task_arr
  end
end
