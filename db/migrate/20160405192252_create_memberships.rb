class CreateMemberships < ActiveRecord::Migration
  def change
    create_table :memberships do |t|
      t.integer :member_id, null: false
      t.integer :team_id, null: false
      t.timestamps null: false
    end
  end
end
