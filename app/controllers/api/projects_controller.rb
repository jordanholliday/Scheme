class Api::ProjectsController < ApplicationController

  def index
    @projects = current_user.team.projects
    render :index
  end

  def create
    @project = Project.new(project_params)

    if @project.save
      render :show
    end
  end

  private
  def project_params
    params.require(:project).permit(:name, :team_id)
  end
end
