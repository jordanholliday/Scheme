class Task < ActiveRecord::Base
  validates :name, :creator_id, presence: true
  validates :completed, inclusion: { in: [true, false] }
  validates :repeats, inclusion: {
    in: %w(daily weekly weekdays monthly),
    allow_nil: true
  }

  belongs_to(
    :creator,
    class_name: 'User',
    primary_key: :id,
    foreign_key: :creator_id
  )

  belongs_to :project

  def previous_task
    return unless self.previous_task_id
    Task.find(self.previous_task_id)
  end

  def next_task
    return unless self.next_task_id
    Task.find(self.next_task_id)
  end

  def connect_next_previous
    if self.next_task
      the_next_task = self.next_task
      the_next_task.previous_task_id = self.previous_task_id
      the_next_task.save
    end

    if self.previous_task
      the_previous_task = self.previous_task
      the_previous_task.next_task_id = self.next_task_id
      the_previous_task.save
    end

    if self.project.last_task_id == self.id
      the_project = self.project
      the_project.last_task_id = self.previous_task_id
      the_project.save
    end
  end
end
