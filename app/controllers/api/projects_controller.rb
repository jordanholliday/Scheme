class Api::ProjectsController < ApplicationController

  def index
    @projects = current_user.team.projects
    render :index
  end

end
