class Api::TasksController < ApplicationController

  def index
    return_all_current_user_tasks
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

    # if @task.id == current_user.id
    #   @task.update(task_params)
    #   render :show
    # else
    #   redirect_to api_tasks_url
    # end
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy

    return_all_current_user_tasks

    # if task.creator_id == current_user.id
    #   task.destroy
    # end

    # redirect_to api_tasks_url
  end

  private
  def task_params
    params.require(:task).permit(
      :name,
      :description,
      :deadline,
      :repeats,
      :assignee_id,
      :completed
    )
  end

  def return_all_current_user_tasks
    @tasks = current_user.tasks.where(completed: false)
    render :index
  end

end
