var React = require('react'),
    TeamUserStore = require('../stores/team_users'),
    SessionStore = require('../stores/sessions'),
    ApiUtil = require('../util/api_util');

var TaskCommentForm = React.createClass({
  getInitialState: function () {
    return {user: SessionStore.currentUser()};
  },

  update: function () {

  },

  showSubmit: function () {
    this.setState({showSubmit: true});
  },

  hideSubmit: function () {
    this.setState({showSubmit: false});
  },

  renderSubmitButton: function () {
    return (
      <div className="submit-button">
        <button>Comment</button>
      </div>
    );
  },

  render: function () {
    return (<div className="group task-comment-form">
      <img className="comment-avatar" src={this.state.user.avatar_url} />
      <div className="textarea">
        <textarea onChange={this.update} onFocus={this.showSubmit} onBlur={this.hideSubmit} placeholder="Write a comment..."></textarea>
        {this.state.showSubmit ? this.renderSubmitButton() : null}
      </div>
    </div>);
  }
});

module.exports = TaskCommentForm;
