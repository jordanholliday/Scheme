class AddAcceptedtoInvites < ActiveRecord::Migration
  def change
    add_column :invites, :replied, :boolean, default: false
  end
end
