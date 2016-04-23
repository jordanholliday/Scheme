class Api::CommentsController < ApplicationController
  Pusher.app_id = ENV["pusher_app_id"]
  Pusher.key    = ENV["pusher_key"]
  Pusher.secret = ENV["pusher_secret"]
  Pusher.logger = Rails.logger
  Pusher.encrypted = true

  def create
    comment = TaskComment.new(task_comment_params)
    comment.user_id = current_user.id

    if comment.save
      Pusher.trigger('task_channel', 'new_comment', {task_id: comment.task_id})
      render json: comment
    end
  end

  private
  def task_comment_params
    params.require(:comment).permit(:task_id, :body)
  end
end
