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
    // start by getting tasks from store
    var returnState = {tasks: TaskStore.all()}
    // Check if there are any tasks. If not, give a blank component
    // to edit. Check returnState, not this.state, as new this.state
    // will not be set yet.
    if ($.isEmptyObject(returnState.tasks)) {
      returnState.addingTask = true;
    } else {
      returnState.addingTask = false;
    }

    return returnState;
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

  taskStoreIsEmpty: function () {
    if (!this.state) {
      return true;
    } else {
      return $.isEmptyObject(this.state.tasks);
    }
  },

  emptyTask: function () {
    return {
      name: null,
      id: -1,
      persisted: false,
      new: true
    }
  },

  render: function () {
    var allTasks = [];
    // if task store isn't empty, put all tasks in allTasks arr
    if (!this.taskStoreIsEmpty()) {
      Object.keys(this.state.tasks).forEach( function (taskId) {
        allTasks.push(<TaskIndexItem
          task={this.state.tasks[taskId]}
          key={taskId}
          focus={false}
        />);
      }.bind(this));
    }

    // if addingTask is true, include a blank index item
    if (this.state.addingTask) {
      allTasks.push(
        <TaskIndexItem
          task={this.emptyTask()}
          className="edit-task"
          key="-1"
          focus={true}
        />
      );
    }

    return (
      <div className="task-wrapper">

        <section className="task-index">
          <button onClick={this.showNewTaskForm}>Add Task</button>
          <ul className="task-list-ul">
            {allTasks}
          </ul>
        </section>

        {this.props.children}

      </div>
    );
  }
});
module.exports = TaskIndex;
