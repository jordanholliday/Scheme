class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render json: @user
      5.times do
        task = @user.tasks.new
        task.name = Faker::Company.bs
        task.description =
          [Faker::Hacker.say_something_smart,
            Faker::Hacker.say_something_smart,
            Faker::Hacker.say_something_smart].join(" ")
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
