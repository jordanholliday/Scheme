class Api::UsersController < ApplicationController

  def index
    @users = current_user.teammates
    render :index
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render json: @user
      4.times do
        task = @user.tasks.new
        task.name = Faker::Company.bs
        task.description =
          [Faker::Hacker.say_something_smart,
            Faker::Hacker.say_something_smart,
            Faker::Hacker.say_something_smart].join(" ")
        task.assignee_id = User.pluck(:id).sample
        task.deadline = Date.today + rand(14).days
        task.save!
      end
    else
      render json: { message: "Invalid credentials" }, status: 401
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :avatar)
  end
end
