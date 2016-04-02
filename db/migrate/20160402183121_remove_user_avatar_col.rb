class RemoveUserAvatarCol < ActiveRecord::Migration
  def change
    remove_column :users, :avatar_url_file_name
    remove_column :users, :avatar_url_content_type
    remove_column :users, :avatar_url_file_size
    remove_column :users, :avatar_url_updated_at
  end
end
