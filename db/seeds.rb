# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'faker'

# empty existing data
Task.destroy_all
Membership.destroy_all
Team.destroy_all

# Create teams
Team.create!(name: "The Good Guys")
Team.create!(name: "The Villains")


# create a membership for each user to reference in next loop
User.all.each do |user|
  Membership.create!(member_id: user.id, team_id: Team.all.pluck(:id).sample)
end

# create tasks and assignments among teammates
User.all.each do |user|
  10.times do
    task = Task.new
    task.name = Faker::Company.bs
    task.description =
      [Faker::Hacker.say_something_smart,
        Faker::Hacker.say_something_smart,
        Faker::Hacker.say_something_smart].join(" ")
    task.assignee_id = user.teammates.pluck(:id).sample
    task.creator_id = user.teammates.pluck(:id).sample
    task.deadline = Date.today + rand(14).days
    task.save!
  end
end
