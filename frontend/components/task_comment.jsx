var React = require('react'),
    TeamUserStore = require('../stores/team_users');

var TaskComment = React.createClass({
  getInitialState: function () {
    return this.getStateFromTeamUserStore();
  },

  getStateFromTeamUserStore: function () {
    var commentAuthor = TeamUserStore.findUser(this.props.comment.user_id);
    if (commentAuthor) {
      return {
        authorName: commentAuthor.name,
        authorAvatarUrl: commentAuthor.avatar_url
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

  render: function () {
    return (
      <div>
        <p>{this.state.authorName ? this.state.authorName : null}</p>
        <p>{this.props.comment.body}</p>
      </div>
    );
  }
});

module.exports=TaskComment;
