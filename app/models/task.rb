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

  def <=>(task)
    return -1 if !self.previous_task_id
    return 1 if !task.previous_task_id
    self.previous_task_id <=> task.previous_task_id
  end
end
