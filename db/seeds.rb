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
Project.destroy_all
Invite.destroy_all

# Create teams
team1 = Team.create!(name: "The Good Guys")

# Create projects
team1.projects.create!(name: "Steal Shamoo")
team1.projects.create!(name: "Become Inhumanly Shredded")

# create a membership for each user to reference in next loop
User.all.each do |user|
  Membership.create!(member_id: user.id, team_id: team1.id)
end

# create tasks and assignments among teammates
User.all.each do |user|
  3.times do
    task = Task.new
    task.name = Faker::Company.bs
    task.name = task.name.slice(0,1).capitalize + task.name.slice(1..-1)
    task.description =
      [Faker::Hacker.say_something_smart,
        Faker::Hacker.say_something_smart,
        Faker::Hacker.say_something_smart].join("\n\n")
    task.assignee_id = user.teammates.pluck(:id).sample
    task.creator_id = user.teammates.pluck(:id).sample
    task.project_id = user.team.projects.pluck(:id).sample
    task.deadline = Date.today - 4.days + rand(14).days
    task.save!


    # set order on tasks
    task_project = task.project

    # if project has an existing last task, set that as new task's previous task
    if task_project.last_task_id
      task.previous_task_id = task_project.last_task_id
      next_task = Task.find(task.previous_task_id)
      next_task.next_task_id = task.id
      next_task.save!
    end

    # in any case, set new task as project's last task
    task_project.last_task_id = task.id

    task.save!
    task_project.save!
  end
end
