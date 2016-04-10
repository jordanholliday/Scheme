var React = require('react'),
    ReactDOM = require('react-dom'),
    TaskStore = require('../stores/tasks'),
    ApiUtil = require('../util/api_util'),
    TaskIndexItem = require('./task_index_item.jsx'),
    DragDropContext = require('react-dnd').DragDropContext,
    HTML5Backend = require('react-dnd-html5-backend');

var TaskIndex = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  projectId: function () {
    return this.props.project.id;
  },

  getStateFromStore: function () {
    // start by getting tasks from store
    var returnState;
    if (this.props.project) {
      returnState = {tasks: TaskStore.all()};
    } else {
      returnState = {tasks: null};
    }
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

  componentWillReceiveProps: function (newProps) {
    if (!newProps.project) {
      return;
    } else if (this.props.projectId !== newProps.projectId) {
      ApiUtil.fetchProjectTasks(newProps.project.id);
    }
  },

  componentWillMount: function () {
    ApiUtil.fetchProjectTasks(this.props.projectId);
  },

  componentDidMount: function () {
    this.taskStoreToken = TaskStore.addListener(this.setStateFromStore);
  },

  componentWillUnmount: function () {
    this.taskStoreToken.remove();
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
      new: true,
      projectId: this.props.project ? this.props.project.id : null
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
          projectId={this.props.project ? this.props.project.id : null}
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
          projectId={this.props.project ? this.props.project.id : null}
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
});

// module.exports = TaskIndex;
module.exports = DragDropContext(HTML5Backend)(TaskIndex);
