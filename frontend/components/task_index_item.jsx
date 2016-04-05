var React = require('react'),
    ReactDOM = require('react-dom'),
    TaskStore = require('../stores/tasks');
    Link = require('react-router').Link,
    TaskAction = require('../actions/task_actions'),
    TaskUtil = require('../util/task_util.js');

var TaskIndexItem = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return { task: this.props.task };
  },

  setStateFromStore: function () {
    var taskInStore = TaskStore.find(this.state.task.id);
    if (taskInStore) {
      this.setState({task: taskInStore});
    }
  },

  componentDidMount: function () {
    this.taskStoreToken = TaskStore.addListener(this.setStateFromStore);
  },

  componentWillUnmount: function () {
    this.taskStoreToken.remove();
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({
      task: newProps.task
    })
  },

  // task.name is held in state and updated as user types
  handleType: function () {
    var currentTaskName = this.refs.childInput.value;
    this.state.task.name = currentTaskName;

    // changes to new tasks are handled within component,
    // not communicated to the store
    if (!this.state.task.new) {
      this.storeUpdateTask();
    } else {
      this.setState({task: this.state.task})
    }
  },

  storeUpdateTask: function () {
    TaskActions.updateTaskInStore(this.state.task);
  },

  // onBlur callback, calls ApiUtil to create task, update task,
  // or delete task if name is blank
  saveNameChange: function () {
    // do nothing if no changes have occurred OR task is new and name is blank
    if (!this.state.task) {
      return
    } else if (this.state.task.persisted && this.state.task.name === this.props.task.name) {
      return
    } else if (!this.state.task.name && !this.state.task.persisted) {
      return
    }

    if (this.state.task.new) {
      // else if not persisted, create the task in DB
     this.apiCreateTask(this.state.task.name);
    } else {
      this.apiUpdateTaskName(this.state.task.id, this.state.task.name)
    }
  },

  // delete tasks with empty names if delete is pressed
  keyDownHandler: function (event) {
    if (event.which === 8 && this.state.task.name === "") {
      // delete if user clears out name of persisted task
      event.preventDefault();
      this.apiDeleteTask(this.state.task.id)
    }
  },

  apiDeleteTask: function (id) {
    ApiUtil.deleteTask({
      id: id
    })
  },

  apiCreateTask: function (name) {
    ApiUtil.createTask({
      name: name
    })
  },

  apiUpdateTaskName: function (id, name) {
    ApiUtil.updateTask({
      id: this.state.task.id,
      name: this.state.task.name
    })
  },

  apiCompleteTask: function () {
    ApiUtil.completeTask({
      id: this.state.task.id,
      completed: true
    })
  },

  // routing to show TaskDetail pane
  clickToShowDetail: function () {
    if (!this.props.task) {return}
    this.context.router.push("tasks/" + this.state.task.id)
  },

  renderDeadline: function () {
    return (
      <div className="date-block">
        {TaskUtil.contextualDeadline(this.state.task.deadline)}
      </div>
    )
  },

  render: function () {
    var button,
        input;
    if (this.state.task){
      button =
        <button className="complete-task-button"
        onClick={this.apiCompleteTask}>
          <svg viewBox="0 0 32 32" className="check-complete" >
            <polygon points="30,5.077 26,2 11.5,22.5 4.5,15.5 1,19 12,30" />
          </svg>
        </button>
    }

    var taskName, taskId;

    if (!this.state.task) {
      taskName = null;
      taskId = $('.task-input').length + 835;
    } else {
      taskName = this.state.task.name;
      taskId = this.state.task.Id;
    }

    input = <input
            ref="childInput"
            type="text"
            className="task-input"
            value={taskName}
            id={taskId}
            autoFocus={this.props.focus}
            onChange={this.handleType}
            onBlur={this.saveNameChange}
            onMouseOut={this.saveNameChange}
            onKeyDown={this.keyDownHandler}
            onClick={this.clickToShowDetail}
           />

    return (
        <li className="group task-index-item">
          {button}
          {input}
          {this.state.task && this.state.task.deadline ? this.renderDeadline() : null }
        </li>
    )
  }
});

module.exports = TaskIndexItem;
