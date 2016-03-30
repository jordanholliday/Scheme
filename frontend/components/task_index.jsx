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

  showNewTaskForm: function () {
    this.setState({addingTask: true});
  },

  render: function () {
    var allTasks = [];
    if ($.isEmptyObject(this.state.tasks)) {
      // if no tasks in TaskStore yet, show loading msg
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

      if (this.state.addingTask) {
        allTasks.push(
          <TaskIndexItem
            className="edit-task"
          />
        );
      }

      return (
        <section className="task-index">
          <button onClick={this.showNewTaskForm}>Add Task</button>
          <ul className="task-list-ul">
            {allTasks}
          </ul>
        </section>
      );
    }
  }
});
module.exports = TaskIndex;
