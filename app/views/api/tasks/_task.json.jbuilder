json.extract! task, :id, :name, :description, :deadline, :repeats, :completed, :parent_id, :assignee_id, :project_id, :next_task_id, :previous_task_id
json.creator task.creator.name
json.project_name task.project.name

task_created_date = task.created_at.to_date

# stringify and prettify the created string
if task_created_date == Date.today
  json.created "Today"
elsif task_created_date == Date.yesterday
  json.created "Yesterday"
else
  date_string = task_created_date.strftime("%B %d")
  if date_string[-2] == "0"
    date_string =date_string.slice(0...-2) + date_string[-1]
  end
  json.created date_string
end
