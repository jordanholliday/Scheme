json.set! :users do
  json.array! @users do |user|
    json.partial! 'user', user: user
  end
end

json.team_name current_user.team.name
json.team_id current_user.team.id
