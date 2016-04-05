class AddMembershipTeamIndexes < ActiveRecord::Migration
  def change
    add_index :memberships, [ :member_id, :team_id ], :unique => true
    add_index :teams, :creator_id
  end
end
