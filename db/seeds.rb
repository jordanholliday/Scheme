# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'faker'

Task.destroy_all

User.all.each do |user|
  10.times do
    task = user.tasks.new
    task.name = Faker::Company.bs
    task.description = Faker::Hacker.say_something_smart
    task.save!
  end
end
