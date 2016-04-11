var React = require('react'),
    TeamUserStore = require('../stores/team_users'),
    TaskUtil = require('../util/task_util');

var TaskComment = React.createClass({
  getInitialState: function () {
    return this.getStateFromTeamUserStore();
  },

  getStateFromTeamUserStore: function () {
    var commentAuthor = TeamUserStore.findUser(this.props.comment.user_id);
    // make created_at date parseable by contextualDeadline method
    var commentDate = new Date(this.props.comment.created_at).toDateString();
    if (commentAuthor) {
      return {
        authorName: commentAuthor.name,
        authorAvatarUrl: commentAuthor.avatar_url,
        commentDate: TaskUtil.contextualDeadline(commentDate)
      };
    } else {
      return {};
    }
  },

  setStateFromTeamUserStore: function () {
    this.setState(this.getStateFromTeamUserStore());
  },

  componentDidMount: function () {
    this.teamUserStoreToken = TeamUserStore.addListener(this.setStateFromTeamUserStore);
  },

  componentWillUnmount: function () {
    this.teamUserStoreToken.remove();
  },

  renderAvatar: function () {
    return <img className="comment-avatar" src={this.state.authorAvatarUrl} />;
  },

  renderCommentBody: function () {
    return (
      <div className="comment-body">
        <label>
        {this.state.authorName}
          <span className="comment-date">
            {this.state.commentDate}
          </span>
        </label>
        <p>{this.props.comment.body}</p>
      </div>
      );
  },

  render: function () {
    return (
      <div className="group task-comment">
        {this.state.authorAvatarUrl ? this.renderAvatar() : null}
        {this.state.authorName ? this.renderCommentBody() : null}
      </div>
    );
  }
});

module.exports=TaskComment;
