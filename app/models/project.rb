class Project < ActiveRecord::Base
  validates :name, :team_id, presence: true

  belongs_to :team

  has_many(
    :users,
    through: :team,
    source: :members
  )

  has_many :tasks
end
