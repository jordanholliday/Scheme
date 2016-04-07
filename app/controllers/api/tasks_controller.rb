class Api::TasksController < ApplicationController

  def index
    return_all_current_user_tasks
  end

  def project_tasks
    return_all_project_tasks(params[:project_id])
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
      render :show
    end
  end

  def update
    @task = Task.find(params[:id])
    @task.update(task_params)
    render :show
  end

  def destroy
    task = Task.find(params[:id])
    project_id = task.project_id
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
    @tasks = Task.where(project_id: project_id).includes(:creator).where(completed: false).sort
    render :index
  end

end
