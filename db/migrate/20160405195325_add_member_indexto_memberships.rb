class AddMemberIndextoMemberships < ActiveRecord::Migration
  def change
    add_index :memberships, :member_id, unique: true
  end
end
