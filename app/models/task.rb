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
end
