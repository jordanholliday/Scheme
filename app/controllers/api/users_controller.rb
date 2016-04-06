class Api::UsersController < ApplicationController

  def index
    @users = current_user.teammates
    render :index
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      accept_invite_or_create_new_team(@user)
      render json: @user
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

  def seed_tasks_for_user(user)
    4.times do
      task = user.tasks.new
      task.name = Faker::Company.bs
      task.description =
        [Faker::Hacker.say_something_smart,
          Faker::Hacker.say_something_smart,
          Faker::Hacker.say_something_smart].join(" ")
      task.assignee_id = user.id
      task.deadline = Date.today + rand(14).days
      task.save!
    end
  end

  def accept_invite_or_create_new_team(user)
    invite = Invite.find_by(email: user.email)
    if invite
      Membership.create(member_id: user.id, team_id: invite.team_id)
      invite.replied = true
      invite.save
    else
      team = Team.create(creator_id: user.id, name: user.name + "'s Workspace")
      Membership.create(member_id: user.id, team_id: team.id)
      seed_tasks_for_user(user)
    end
  end
end
