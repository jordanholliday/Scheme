class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def logged_in?
    !current_user.nil?
  end

  def login!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

  # Routing on front end, un-authed request will return empty responses
  # def redirect_unless_logged_out
  #   redirect_to user_url(current_user) if logged_in?
  # end

  # def redirect_if_logged_out
  #   redirect_to new_session_url unless logged_in?
  # end
end
