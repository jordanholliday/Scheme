var React = require('react'),
    ReactDom = require('react-dom'),
    ApiUtil = require('../util/api_util.js'),
    TeamUserStore = require('../stores/team_users'),
    DatePicker = require('react-date-picker'),
    TaskUtil = require('../util/task_util.js'),
    OptionsDatePicker = require('./options_date_picker');

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

module.exports = AssigneeDropdownLi;
