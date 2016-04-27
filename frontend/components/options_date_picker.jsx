var React = require('react'),
    ReactDom = require('react-dom'),
    ApiUtil = require('../util/api_util.js'),
    TeamUserStore = require('../stores/team_users'),
    DatePicker = require('react-date-picker'),
    TaskUtil = require('../util/task_util.js');

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
    if (!this.state.deadline) {
      return null;
    }
    // prettify date for options bar
    // return new Date(Date.parse(this.state.deadline)).toDateString().split(" ").slice(1).join(" ");
    return TaskUtil.contextualDeadline(this.state.deadline);
  },

  onChangePlaceholder: function () {
    null;
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
        <div
          className="calendar-circle"
          onClick={this.props.inputClickHandler}
          >
            {this.calendarIcon()}
        </div>
        <input
          className="date-input"
          type="text"
          value={this.shortDeadline()}
          onChange={this.onChangePlaceholder}
          onClick={this.props.inputClickHandler}
        />
        {this.state.pickingDate ? this.datePickerComponent() : null}
      </div>

    );
  }
})

module.exports = OptionsDatePicker;
