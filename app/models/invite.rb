class Invite < ActiveRecord::Base
  validates :team_id, :email, presence: true
  validates :email, uniqueness: true
end
