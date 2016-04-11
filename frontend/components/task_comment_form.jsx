var React = require('react'),
    TeamUserStore = require('../stores/team_users'),
    SessionStore = require('../stores/sessions'),
    ApiUtil = require('../util/api_util');

var TaskCommentForm = React.createClass({
  getInitialState: function () {
    return {user: SessionStore.currentUser()};
  },

  componentWillReceiveProps: function () {
    this.setState({showSubmit: false});
    this.refs.commentInput.value = "";
  },

  showSubmit: function () {
    this.setState({showSubmit: true});
  },

  hideSubmit: function () {
    this.setState({showSubmit: false});
  },

  handleSubmit: function () {
    if (this.refs.commentInput.value.length < 1) {
      return;
    } else {
      ApiUtil.createComment({
        task_id: this.props.taskId,
        body: this.refs.commentInput.value
      });
    }
  },

  renderSubmitButton: function () {
    return (
      <div className="submit-button">
        <button onClick={this.handleSubmit}>Comment</button>
      </div>
    );
  },

  render: function () {
    return (<div className="group task-comment-form">
      <img className="comment-avatar" src={this.state.user.avatar_url} />
      <div className="textarea">
        <textarea
          onChange={this.update}
          onFocus={this.showSubmit}
          onBlur={this.hideSubmit}
          ref="commentInput"
          placeholder="Write a comment..."></textarea>
        {this.state.showSubmit ? this.renderSubmitButton() : null}
      </div>
    </div>);
  }
});

module.exports = TaskCommentForm;
