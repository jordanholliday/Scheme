class Api::CommentsController < ApplicationController
  def create
    comment = TaskComment.new(task_comment_params)
    comment.user_id = current_user.id

    if comment.save
      render json: comment
    end
  end

  private
  def task_comment_params
    params.require(:comment).permit(:task_id, :body)
  end
end
