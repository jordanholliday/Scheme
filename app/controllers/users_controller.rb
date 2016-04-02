class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render json: user
    else
      render json: { message: "Invalid credentials" }, status: 401
    end
  end

  def show
    @user = User.find(params[:id])
    render json: user
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :avatar)
  end
end
