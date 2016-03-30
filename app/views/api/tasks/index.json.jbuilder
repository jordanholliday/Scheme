json.array! @tasks do |task|
  json.partial! 'task', task: task
end
