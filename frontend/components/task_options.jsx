var React = require('react'),
    ReactDom = require('react-dom'),
    ApiUtil = require('../util/api_util.js'),
    TeamUserStore = require('../stores/team_users'),
    DatePicker = require('react-date-picker'),
    TaskUtil = require('../util/task_util.js');

var TaskOptions = React.createClass({
  getInitialState: function () {
    return {
      teamUsers: null,
      assigneeId: this.props.task.assignee_id,
      deadline: this.props.task.deadline,
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
      assigneeInput: ""
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
            <AssigneeDropdownLi teamUser={this.state.teamUsers[id]} changeHandler={this.updateTaskAssignment} />
          );
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
      currentAssigneeDetail = <div className="group current-assignee-date" onClick={this.setStateAssigning}>
          <img src={this.assigneeAvatar()} />
          <input
            type="text"
            ref="assigneeInput"
            placeholder={this.assigneeName()}
            onChange={this.updateAssigneeInput}
            onBlur={this.resetAssigneeInput} />
          {this.state.assigning ? this.teamUserDropdown() : null}
        </div>
    } else {
      currentAssigneeDetail = <div className="group current-assignee-date unassigned" onClick={this.setStateAssigning}>
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
      }

    return (
        <section className="task-options">
          <div className={this.state.assigning ? "assigning" : "not-assigning"}>
            {currentAssigneeDetail}
          </div>
          <div className={this.state.pickingDate ? "assigning" : "not-assigning"}>
            <OptionsDatePicker
              deadline={this.props.task.deadline}
              pickingDate={this.state.pickingDate}
              changeHandler={this.updateTaskDeadline}
              inputClickHandler={this.setStatePickingDate} />
          </div>
        </section>
      );
  }
});


// SUBCOMPONENT - Used in assignment selector above.
var AssigneeDropdownLi = React.createClass({

  updateTaskAssignment: function () {
    this.props.changeHandler(this.props.teamUser.id);
  },

  render: function () {
    return (<li className="group" onMouseDown={this.updateTaskAssignment} >
      <img src={this.props.teamUser.avatar_url} />
      <label className="name">{this.props.teamUser.name}</label>
      <label className="email">{this.props.teamUser.email}</label>
    </li>);
  }
});

var OptionsDatePicker = React.createClass({
  getInitialState: function () {
    return {deadline: this.props.deadline, viewDate: this.props.deadline};
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({
      deadline: newProps.deadline,
      viewDate: newProps.deadline,
      pickingDate: newProps.pickingDate
    });
  },

  setDeadline: function (dateText) {
    this.setState({deadline: dateText});
    this.props.changeHandler(dateText);
  },

  handleViewChange: function (dateText) {
    this.setState({viewDate: dateText});
  },

  calendarIcon: function () {
    return (
      <svg className="calendar-icon" viewBox="0 0 32 32" title="calendar"><rect x="14" y="14" width="2" height="2"></rect><rect x="18" y="14" width="2" height="2"></rect><rect x="22" y="14" width="2" height="2"></rect><rect x="6" y="18" width="2" height="2"></rect><rect x="10" y="18" width="2" height="2"></rect><rect x="14" y="18" width="2" height="2"></rect><rect x="18" y="18" width="2" height="2"></rect><rect x="22" y="18" width="2" height="2"></rect><rect x="6" y="22" width="2" height="2"></rect><rect x="10" y="22" width="2" height="2"></rect><rect x="14" y="22" width="2" height="2"></rect><rect x="18" y="22" width="2" height="2"></rect><rect x="22" y="22" width="2" height="2"></rect><rect x="6" y="26" width="2" height="2"></rect><rect x="10" y="26" width="2" height="2"></rect><rect x="14" y="26" width="2" height="2"></rect><path d="M28,4h-2V2c0-1.105-0.895-2-2-2h-2c-1.105,0-2,0.895-2,2v2h-8V2c0-1.105-0.895-2-2-2H8C6.895,0,6,0.895,6,2v2H4    C2.895,4,2,4.895,2,6v24c0,1.105,0.895,2,2,2h24c1.105,0,2-0.895,2-2V6C30,4.895,29.105,4,28,4z M22,2h2v6h-2V2z M8,2h2v6H8V2z     M28,30H4V12h24V30z"></path></svg>
      )
  },

  shortDeadline: function () {
    // prettify date for options bar
    // return new Date(Date.parse(this.state.deadline)).toDateString().split(" ").slice(1).join(" ");
    return TaskUtil.contextualDeadline(this.state.deadline);
  },

  datePickerComponent: function () {
    return (
      <DatePicker
      className="date-picker-component"
        minDate='2015-10-10'
        maxDate='2020-10-10'
        date={this.state.deadline}
        viewDate={this.state.viewDate ? this.state.viewDate : new Date()}
        hideFooter={true}
        weekDayNames={["SU", "MO", "TU", "WE", "TH", "FR", "SA"]}
        onChange={this.setDeadline}
        onViewDateChange={this.handleViewChange}
        onMouseLeave={this.props.inputClickHandler}
      />
    );
  },

  render: function () {
    var car;
    return (
      <div className="group current-assignee-date">
        <div className="calendar-circle">{this.calendarIcon()}</div>
        <input
          className="date-input"
          type="text"
          value={this.shortDeadline()}
          onClick={this.props.inputClickHandler}
        />
        {this.state.pickingDate ? this.datePickerComponent() : null}
      </div>

    );
  }
})

module.exports = TaskOptions;
