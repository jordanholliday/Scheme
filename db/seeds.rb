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
TaskComment.destroy_all

# Create teams
team1 = Team.create!(name: "The Good Guys")

# Create projects
scheme_project = team1.projects.create!(name: "Learn to Scheme")
other_proj1 = team1.projects.create!(name: "Steal Shamoo")
other_proj2 = team1.projects.create!(name: "Become Inhumanly Shredded")

# create a membership for each user to reference in next loop
User.all.each do |user|
  Membership.create!(member_id: user.id, team_id: team1.id)
end

# create tasks and assignments among teammates
User.all.each do |user|
  2.times do
    task = Task.new
    task.name = Faker::Company.bs
    task.name = task.name.slice(0,1).capitalize + task.name.slice(1..-1)
    task.description =
      [Faker::Hacker.say_something_smart,
        Faker::Hacker.say_something_smart,
        Faker::Hacker.say_something_smart].join("\n\n")
    task.assignee_id = user.teammates.pluck(:id).sample
    task.creator_id = user.teammates.pluck(:id).sample
    task.project_id = [other_proj1.id, other_proj2.id].sample
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

# “Learn About Scheme” Seeds
scheme_tasks = {
  1=> {name:  'Tasks / Projects / Teams', description: "Scheme is organized into Tasks, Projects, and Teams.\n\nTasks are where it all begins. Ideally, a task is a small, specific to-do item. You’re looking at a task now.\n\nTasks are organized into projects, which are longer-term undertakings than tasks.\n\nTeams are groups of users who work together. In Scheme, team members can all access the same projects and tasks."
  },

  2=> {name: 'Task Assignments & Assignees', description: "You can assign tasks using the dropdown above. If you have lots of people on your team, try typing the assignee’s name into the input box—it’s faster than scrolling through the full list of your teammates.\n\nThe assignment dropdown is 100% roll-your-own."
  },

  3=> {name: 'Task Deadlines', description: "You can assign deadlines to tasks using the date picker above, which was made using the React-DatePicker component.\n\nTo imitate Asana’s contextual deadlines (e.g., “tomorrow” instead of tomorrow’s MM/DD date), I created a date_util file with several reusable date-parsing functions."
  },

  4=> {name: 'Drag & Drop Tasks', description:"To reorder a task, grab it by the potato (far left) and drag it above another task.\n\nTask order is maintained in a linked list data structuring, which allows for constant-time reordering of tasks, no matter how large a project grows."
  },

  5=> { name: 'Task CRUD & Complete', description: "While Scheming, you’ll want to create, delete, and complete tasks.\n\nUse the “Add Task” button to create a new task. To delete it, go to the task list and delete its full name. And to complete it, click the checkmark above or to the left."
  },

  6=> {name: 'New Projects', description: "You can also create new projects. Click the hamburger (top left) to open the side drawer, then click the + above your current project list."
  },

  7=> {name: 'Drag & Drop Avatars', description: "Scheme users can upload avatars when they register. For maximum uploading ease, the registration page incorporates React’s Dropzone component, which enables drag-n-drop uploads.\n\nAvatars are stored remotely via Amazon AWS S3."
  },

  8=> {name: 'Inviting New Team Members', description: "Click the orange button in the navbar to invite someone else to Scheme. Scheme will store their email address, and when they register, they will be automatically added to your team.\n\nOn the other hand, if you come to Scheme uninvited—everyone starts somewhere—you’ll get your own team, pre-populated with your first project and introductory tasks."
  },

  9=> {name: 'Comments', description: "Each task comes complete with a comment form, which you can use to encourage / callout / promise vengeance against your teammates."
  },

  10=>{name: 'New Tasks and Comments in Realtime', description: "Scheme uses Pusher to send online users new tasks and comments in realtime.\n\nWanna see? Using another brower, log in with email `hov@gmail.com` and password `abc123` and try it out."}
}

scheme_tasks.each do |key, val|
  task = scheme_project.tasks.new(name: val[:name], description: val[:description])
  task.assignee_id = team1.members.pluck(:id).sample
  task.creator_id = team1.members.pluck(:id).sample
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

scheme_project.tasks.first.task_comments.create!(body: "Welcome, teammate.", user_id: team1.members.sample.id)
scheme_project.tasks.second.task_comments.create!(body: "Status update? Client is demanding an update on the CSS bandwidth.", user_id: team1.members.sample.id)
scheme_project.tasks.second.task_comments.create!(body: "I don't have visibility into the CSS bandwidth but we pushed the virtual matrix live yesterday.", user_id: team1.members.sample.id)
scheme_project.tasks.third.task_comments.create!(body: "Well this just stinks. I quit!", user_id: team1.members.sample.id)
scheme_project.tasks.third.task_comments.create!(body: "I have never quit.", user_id: team1.members.sample.id)
scheme_project.tasks.sort_by {|task| task.id * -1}.second.task_comments.create!(body: "Everybody had better take this task seriously... or else.", user_id: team1.members.sample.id)
