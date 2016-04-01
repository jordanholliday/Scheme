class Api::SessionsController < ApplicationController

  def show
    if logged_in?
      render json: current_user
    else
      render json: { message: "Not logged in" }, status: 401
    end
  end

  def create
    author = Author.find_by_credentials(
      params[:name],
      params[:password]
    )

    if author && author.valid_password?(params[:password])
      log_in!(author)
      render json: author
    else
      render json: { message: "Invalid credentials" }, status: 401
    end
  end

  def destroy
    log_out!

    render json: {} # Need a valid json object for our AJAX success callback
  end
end
