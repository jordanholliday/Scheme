var React = require('react'),
    ReactDom = require('react-dom'),
    ApiUtil = require('../util/api_util.js'),
    TeamUserStore = require('../stores/team_users'),
    DatePicker = require('react-date-picker'),
    TaskUtil = require('../util/task_util.js'),
    OptionsDatePicker = require('./options_date_picker'),
    AssigneeDropdownLi = require('./assignee_dropdown_li');

var TaskOptions = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      teamUsers: null,
      assigneeId: this.props.task.assignee_id,
      deadline: this.props.task.deadline,
      projectId: this.props.task.project_id,
      assigning: false,
      pickingDate: false,
      assigneeInput: ""
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
      deadline: newProps.task.deadline,
      assigning: false,
      assigneeInput: "",
      projectId: newProps.task.project_id
    });
  },

  componentDidMount: function () {
    this.teamStoreToken = TeamUserStore.addListener(this.getStateFromStore);
    ApiUtil.fetchTeamUsers();
  },

  componentWillUnmount: function () {
    this.teamStoreToken.remove();
  },

  componentDidUpdate: function () {
    if (this.state.assigning) {
      this.refs.assigneeInput.focus();
    }
  },

  closeTaskDetail: function () {
    this.context.router.push("/projects/" + this.state.projectId);
  },

  setStateAssigning: function (e) {
    if (this.state.assigning) {
      this.setState({assigning: false, assigneeInput: ""});
    } else {
      this.setState({assigning: true, pickingDate: false });
    };
  },

  setStatePickingDate: function (e) {
    if (this.state.pickingDate) {
      this.setState({pickingDate: false});
    } else {
      this.setState({pickingDate: true , assigning: false});
    };
  },

  setStatePickingDateTrue: function (e) {
    e.stopPropagation();
    this.setState({pickingDate: true , assigning: false});
  },

  setStatePickingDateFalse: function (e) {
    e.stopPropagation();
    this.setState({pickingDate: false});
  },

  resetAssigneeInput: function (e) {
    this.setStateAssigning(e);
    e.currentTarget.value = "";
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

  updateAssigneeInput: function (e) {
    this.setState({assigneeInput: e.currentTarget.value });
  },

  updateTaskAssignment: function (userId) {
    var updatedTask = {
      id: this.props.task.id,
      assignee_id: userId
    }
    ApiUtil.updateTask(updatedTask);
  },

  updateTaskDeadline: function (date) {
    var updatedTask = {
      id: this.props.task.id,
      deadline: date
    }
    ApiUtil.updateTask(updatedTask);
  },

  teamUserDropdown: function () {
    var teamUserLis = [];
    // first, check if there's input text to search by and filter with it if so
    if (this.state.teamUsers && this.state.assigneeInput.length > 0) {
      for (var id in this.state.teamUsers) {
        var usernameLowerCase = this.state.teamUsers[id].name.toLowerCase();
        var emailLowerCase = this.state.teamUsers[id].email.toLowerCase();
        var searchStrLowerCase = this.state.assigneeInput.toLowerCase();
        if (usernameLowerCase.search(searchStrLowerCase) !== -1 || emailLowerCase.search(searchStrLowerCase) !== -1) {
          teamUserLis.push(
            <AssigneeDropdownLi
              teamUser={this.state.teamUsers[id]}
              changeHandler={this.updateTaskAssignment}
              key={this.state.teamUsers[id].id}  />
          );
        }
      }
    } else {
    // if no input text, insert all teamUsers into dropdown
      for (var id in this.state.teamUsers) {
          teamUserLis.push(
            <AssigneeDropdownLi
              teamUser={this.state.teamUsers[id]}
              changeHandler={this.updateTaskAssignment}
              key={this.state.teamUsers[id].id}  />
          );
      }
    }
    return (
      <div className="team-user-div">
        {teamUserLis}
      </div>
      );
  },

  renderCurrentAssigneeDetail: function () {
    if (this.assigneeName()) {
      return (
        <div className="group current-assignee-date" onClick={this.setStateAssigning}>
          <img src={this.assigneeAvatar()} />
          <input
            type="text"
            ref="assigneeInput"
            placeholder={this.assigneeName()}
            onChange={this.updateAssigneeInput}
            onBlur={this.resetAssigneeInput} />
          {this.state.assigning ? this.teamUserDropdown() : null}
        </div>
      )
    } else {
      return (
          <div className="group current-assignee-date unassigned" onClick={this.setStateAssigning}>
            <svg viewBox="0 0 32 32">
              <path d="M20.073,18.606C22.599,16.669,24,12.995,24,9.412C24,4.214,21.054,0,16,0S8,4.214,8,9.412 c0,3.584,1.401,7.257,3.927,9.194C6.182,20.351,2,25.685,2,32h2c0-6.617,5.383-12,12-12s12,5.383,12,12h2 C30,25.685,25.818,20.351,20.073,18.606z M10,9.412C10,4.292,13.013,2,16,2s6,2.292,6,7.412C22,13.633,19.756,18,16,18 C12.244,18,10,13.633,10,9.412z"></path>
            </svg>
            <input
              ref="assigneeInput"
              type="text"
              placeholder="Unassigned"
              onChange={this.updateAssigneeInput}
              onBlur={this.resetAssigneeInput} />
            {this.state.assigning ? this.teamUserDropdown() : null}
          </div>
        )
      }
  },

  render: function () {
    return (
        <section className="task-options">
          <div className={this.state.assigning ? "assigning" : "not-assigning"}>
            {this.renderCurrentAssigneeDetail()}
          </div>
          <div className={this.state.pickingDate ? "assigning" : "not-assigning"}>
            <OptionsDatePicker
              deadline={this.props.task.deadline}
              pickingDate={this.state.pickingDate}
              changeHandler={this.updateTaskDeadline}
              inputClickHandler={this.setStatePickingDate} />
          </div>
          <button className="close-task-detail" onClick={this.closeTaskDetail}>
            <svg viewBox="0 0 32 32"><polygon points="23.778,5.393 16,13.172 8.222,5.393 5.393,8.222 13.172,16 5.393,23.778 8.222,26.607 16,18.828 23.778,26.607 26.607,23.778 18.828,16 26.607,8.222"></polygon></svg>
          </button>
        </section>
      );
  }
});

module.exports = TaskOptions;
