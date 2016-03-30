class Api::TasksController < ApplicationController

  def index
    @tasks = Task.where(creator_id: current_user.id)
  end

  def show
    @task = Task.find(params[:id])
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

end
