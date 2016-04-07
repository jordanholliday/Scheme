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
     this.apiCreateTask({name: this.state.task.name, project_id: this.props.projectId});
    } else {
      this.apiUpdateTaskName(this.state.task.id, this.state.task.name)
    }
  },

  // delete tasks with empty names if delete is pressed
  keyDownHandler: function (event) {
    if (event.which === 8 && !this.state.task.new && this.state.task.name === "") {
      // delete if user clears out name of PERSISTED (!this.state.task.new) task
      event.preventDefault();
      this.apiDeleteTask(this.state.task)
    }
  },

  apiDeleteTask: function (task) {
    ApiUtil.deleteTask({
      id: task.id,
      project_id: task.project_id
    })
  },

  apiCreateTask: function (task) {
    ApiUtil.createTask({
      name: task.name,
      project_id: task.project_id
    })
  },

  apiUpdateTaskName: function (id, name) {
    ApiUtil.updateTask({
      id: this.state.task.id,
      name: this.state.task.name
    })
  },

  apiCompleteTask: function (e) {
    if (!this.state.task.persisted) {return}
    e.stopPropagation();
    ApiUtil.completeTask({
      id: this.state.task.id,
      completed: true,
      projectId: this.state.task.project_id
    })
  },

  // routing to show TaskDetail pane
  clickToShowDetail: function () {
    if (!this.props.task) {return}
    // if user is clicking and task isn't saved, go ahead & save
    if (!this.state.task.persisted && this.state.task.name) {
      this.apiCreateTask(this.state.task);
      return;
    }
    this.context.router.push("projects/" + this.props.projectId + "/" + this.state.task.id)
  },

  setDateClass: function () {
    var res = TaskUtil.pastPresentOrFutureTask(this.state.task.deadline);
    this.state.task.dateClass = "";
    if (res === -1) {
      this.state.task.dateClass = " past-due";
    } else if (res === 0) {
      this.state.task.dateClass = " due-soon";
    }
  },

  setContextualDeadline: function () {
    this.state.task.contextualDeadline = TaskUtil.contextualDeadline(this.state.task.deadline)
  },

  renderDeadline: function () {
    if (!this.state.task.dateClass) {
      this.setDateClass();
    }

    if (!this.state.task.contextualDeadline) {
      this.setContextualDeadline();
    }

    return (
      <div className={"date-block" + this.state.task.dateClass}>
        {this.state.task.contextualDeadline}
      </div>
    )
  },

  renderDragHandle: function () {
    return (<div className="drag-handle"></div>);
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
           />

    return (
        <li className="group task-index-item" onClick={this.clickToShowDetail}>
          {this.renderDragHandle()}
          {button}
          {input}
          {this.state.task && this.state.task.deadline ? this.renderDeadline() : null }
        </li>
    )
  }
});

module.exports = TaskIndexItem;
