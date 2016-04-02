class AddAvatarAttachmentCol < ActiveRecord::Migration
  def change
    remove_column :users, :avatar_url

    change_table :users do |t|
      t.attachment :avatar_url
    end
  end
end
