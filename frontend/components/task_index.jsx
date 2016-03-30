var React = require('react'),
    ReactDOM = require('react-dom'),
    TaskStore = require('../stores/tasks'),
    ApiUtil = require('../util/api_util');

var TaskIndex = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return {tasks: TaskStore.all()};
  },

  setStateFromStore: function () {
    this.setState(this.getStateFromStore());
  },

  componentDidMount: function () {
    TaskStore.addListener(this.setStateFromStore);
    ApiUtil.fetchTasks();
  },

  render: function () {
    var allTasks = [];
    if ($.isEmptyObject(this.state.tasks)) {
      return (<li>loading tasks...</li>)
    } else {
      Object.keys(this.state.tasks).forEach( function (taskId) {
        allTasks.push(<li key={taskId}>{this.state.tasks[taskId].name}</li>);
      }.bind(this));

      return (
        <ul>
          {allTasks}
        </ul>
      );
    }
  }
});
module.exports = TaskIndex;
