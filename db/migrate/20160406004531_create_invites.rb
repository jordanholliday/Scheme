class CreateInvites < ActiveRecord::Migration
  def change
    create_table :invites do |t|
      t.integer :team_id, null: false
      t.string :email, null: false
      t.timestamps null: false
    end

    add_index :invites, :team_id
    add_index :invites, :email, unique: true
  end
end
