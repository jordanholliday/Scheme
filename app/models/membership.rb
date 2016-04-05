class Membership < ActiveRecord::Base
  validates :member_id, :team_id, presence: true
  validates :member_id, uniqueness: true

  belongs_to :team

  belongs_to(
    :member,
    class_name: 'User',
    primary_key: :id,
    foreign_key: :member_id)
end
