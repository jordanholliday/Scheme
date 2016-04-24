class Api::InvitesController < ApplicationController
  def create
    invite = Invite.new(invite_params)
    invite.team_id = current_user.team.id

    if invite.save
      InviteNotifier.send_signup_email(current_user, invite).deliver
      render json: invite
    end
  end

  private
  def invite_params
    params.require(:invite).permit(:email)
  end
end
