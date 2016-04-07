last_task_id = @tasks.first.project.last_task_id

json.array! @tasks do |task|
  json.partial! 'task', task: task
  json.project_last_task last_task_id
end

