class Api::TasksController < ApplicationController

  def index
    return_all_current_user_tasks
  end

  def project_tasks
    return_all_project_tasks(params[:project_id])
  end

  def reorder
    move_task = Task.find(params[:id])
    in_front_of_task = Task.find(params[:in_front_of_task_id])

    Project.reorder_tasks(move_task, in_front_of_task)
    return_all_project_tasks(move_task.project.id)
  end

  def show
    @task = Task.find(params[:id])

    if @task.id == current_user.id
      render :show
    else
      redirect_to api_tasks_url
    end
  end

  def create
    @task = current_user.tasks.new(task_params)

    if @task.save
      add_new_task_to_project_order(@task)
      render :show
    end
  end

  def update
    @task = Task.find(params[:id])
    @task.update(task_params)

    if @task.completed
      @task.connect_next_previous
    end

    render :show
  end

  def destroy
    task = Task.find(params[:id])
    project_id = task.project_id
    task.connect_next_previous
    task.destroy

    return_all_project_tasks(project_id)
  end

  private
  def task_params
    params.require(:task).permit(
      :name,
      :description,
      :deadline,
      :repeats,
      :assignee_id,
      :completed,
      :project_id
    )
  end

  def return_all_current_user_tasks
    @tasks = current_user.teammate_tasks.includes(:creator).where(completed: false)
    render :index
  end

  def return_all_project_tasks(project_id)
    @tasks = Task.where(project_id: project_id).includes(:creator).where(completed: false)
    render :index
  end

  def add_new_task_to_project_order(task)
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
