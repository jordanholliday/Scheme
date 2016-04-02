var React = require('react'),
    ReactDom = require('react-dom'),
    ApiUtil = require('../util/api_util.js'),
    TeamUserStore = require('../stores/team_users');

var TaskOptions = React.createClass({
  getInitialState: function () {
    return {
      teamUsers: null,
      assigneeId: this.props.task.assignee_id,
      deadline: this.props.task.deadline
    };
  },

  getStateFromStore: function () {
    var teamUsers = TeamUserStore.all();
    this.setState({
      teamUsers: teamUsers
    });
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({
      assigneeId: newProps.task.assignee_id,
      deadline: newProps.task.deadline
    });
  },

  componentDidMount: function () {
    TeamUserStore.addListener(this.getStateFromStore);
    ApiUtil.fetchTeamUsers();
  },

  assigneeAvatar: function () {
    var currentAvatar;
    if (this.state.teamUsers && this.state.assigneeId) {
      currentAvatar = this.state.teamUsers[this.state.assigneeId].avatar_url;
    }

    return currentAvatar;
  },

  assigneeName: function () {
    var assigneeName;
    if (this.state.teamUsers && this.state.assigneeId) {
      nameArr = this.state.teamUsers[this.state.assigneeId].name.split(" ");
      if (nameArr.length > 1) {
        assigneeName = nameArr[0] + " " + nameArr[1].slice(0,1);
      } else {
        assigneeName = nameArr[0];
      }
    }

    return assigneeName;
  },

  render: function () {
    return (
        <section className="task-options">
          <div className="group current-assignee">
            <img src={this.assigneeAvatar()} />
            <label>{this.assigneeName()}</label>
          </div>
        </section>
      );
  }
});

module.exports = TaskOptions;
