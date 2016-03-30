var React = require('react'),
    ReactDOM = require('react-dom'),
    TaskStore = require('../stores/tasks'),
    ApiUtil = require('../util/api_util'),
    TaskIndexItem = require('./task_index_item.jsx');

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
      return (
        <section className="task-index">
          <li>loading tasks...</li>
        </section>)
    } else {
      Object.keys(this.state.tasks).forEach( function (taskId) {
        allTasks.push(<TaskIndexItem
          task={this.state.tasks[taskId]}
          key={taskId}
        />);
      }.bind(this));

      return (
        <section className="task-index">
          <ul>
            {allTasks}
          </ul>
        </section>
      );
    }
  }
});
module.exports = TaskIndex;
