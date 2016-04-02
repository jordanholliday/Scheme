json.extract! user, :id, :email, :name
json.avatar_url asset_path(user.avatar.url)
