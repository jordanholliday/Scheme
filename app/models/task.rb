class Task < ActiveRecord::Base
  validates :name, :creator_id, presence: true
  validates :completed, inclusion: { in: [true, false] }

  belongs_to(
    :user,
    class_name: 'User',
    primary_key: :id,
    foreign_key: :creator_id
  )

end
