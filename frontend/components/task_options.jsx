var React = require('react'),
    ReactDom = require('react-dom'),
    ApiUtil = require('../util/api_util.js'),
    TeamUserStore = require('../stores/team_users');

var TaskOptions = React.createClass({
  getInitialState: function () {
    return {
      teamUsers: null,
      assigneeId: this.props.task.assignee_id,
      deadline: this.props.task.deadline,
      assigning: false
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

  componentDidUpdate: function () {
    if (this.state.assigning) {
      this.refs.assigneeInput.focus();
    }
  },

  setStateAssigning: function (e) {
    e.stopPropagation();
    if (this.state.assigning) {
      this.setState({assigning: false});
    } else {
      this.setState({assigning: true, assigneeId: null });
    };
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

  assigneeInputClick: function (e) {
  },

  teamUserDropdown: function () {
    var teamUserLis = [];
    if (this.state.teamUsers) {
      for (var id in this.state.teamUsers) {
        teamUserLis.push(<AssigneeDropdownLi teamUser={this.state.teamUsers[id]} />);
      }
    }
    return (
      <div className="team-user-div">
        {teamUserLis}
      </div>
      );
  },

  render: function () {
    var currentAssigneeDetail;
    if (this.assigneeName()) {
      currentAssigneeDetail = <div className="group current-assignee">
          <img src={this.assigneeAvatar()} />
          <input type="text" ref="assigneeInput" placeholder={this.assigneeName()} />
          {this.teamUserDropdown()}
        </div>
    } else {
      currentAssigneeDetail = <div className="group current-assignee unassigned">
            <svg viewBox="0 0 32 32">
              <path d="M20.073,18.606C22.599,16.669,24,12.995,24,9.412C24,4.214,21.054,0,16,0S8,4.214,8,9.412 c0,3.584,1.401,7.257,3.927,9.194C6.182,20.351,2,25.685,2,32h2c0-6.617,5.383-12,12-12s12,5.383,12,12h2 C30,25.685,25.818,20.351,20.073,18.606z M10,9.412C10,4.292,13.013,2,16,2s6,2.292,6,7.412C22,13.633,19.756,18,16,18 C12.244,18,10,13.633,10,9.412z"></path>
            </svg>
            <input
              ref="assigneeInput"
              type="text"
              value={this.assigneeName()}
              placeholder="Unassigned" />
              {this.teamUserDropdown()}
        </div>
    }

    return (
        <section className="task-options">
          <div onClick={this.setStateAssigning} className={this.state.assigning ? "assigning" : "not-assigning"}>
            {currentAssigneeDetail}
          </div>
        </section>
      );
  }
});

var AssigneeDropdownLi = React.createClass({
  render: function () {
    return (<li className="group" >
      <img src={this.props.teamUser.avatar_url} />
      <label className="name">{this.props.teamUser.name}</label>
      <label className="email">{this.props.teamUser.email}</label>
    </li>);
  }
});

module.exports = TaskOptions;
