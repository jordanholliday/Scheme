class Team < ActiveRecord::Base
  validates :name, presence: true

  has_many(
    :memberships,
    class_name: 'Membership',
    primary_key: :id,
    foreign_key: :team_id
  )

  has_many(
    :members,
    through: :memberships,
    source: :member
  )

  has_many(
    :tasks,
    through: :members,
    source: :tasks
    )

  belongs_to(
    :creator,
    class_name: 'User',
    primary_key: :id,
    foreign_key: :creator_id
  )

  has_many :projects
end
