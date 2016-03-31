var React = require('react'),
    ReactDOM = require('react-dom'),
    TaskStore = require('../stores/tasks');
    Link = require('react-router').Link;

var TaskIndexItem = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    if (this.props.task) {
      return {
        name: this.props.task.name,
        id: this.props.task.id,
        persisted: true
      };
    } else {
      return {
        name: null,
        id: $('.task-input').length + 835,
        persisted: false
      }
    }
  },

  // task.name is held in state and updated as user types
  handleType: function () {
    var currentTaskName = this.refs.childInput.value;
    this.setState({name: currentTaskName})
  },

  // onBlur callback, calls ApiUtil to create task, update task,
  // or delete task if name is blank
  saveNameChange: function () {
    // do nothing if no changes have occurred OR task is new and name is blank
    if (this.state.persisted && this.state.name === this.props.task.name) {
      return
    } else if (this.state.name === null && !this.state.persisted) {
      return
    }

    if (this.state.name === "" && this.state.persisted) {
      // delete if user clears out name of persisted task
      this.apiDeleteTask(this.props.task.id)
    } else if (this.state.persisted) {
      this.apiUpdateTaskName(this.props.task.id, this.state.name)
    } else {
      // else if not persisted, create the task in DB
     this.apiCreateTask(this.state.name);
    }
  },

  // delete tasks with empty names if delete is pressed
  keyDownHandler: function (event) {
    if (this.state.name === "" && this.state.persisted) {
      // delete if user clears out name of persisted task
      this.apiDeleteTask(this.props.task.id)
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
      id: this.props.task.id,
      name: this.state.name
    })
  },

  apiCompleteTask: function () {
    ApiUtil.completeTask({
      id: this.props.task.id,
      completed: true
    })
  },

  clickToShowDetail: function () {
    if (!this.props.task) {return}
    this.context.router.push("tasks/" + this.props.task.id)
  },

  render: function () {
    var button,
        input;
    if (this.props.task){
      button = <button
          className="complete-task-button"
          onClick={this.apiCompleteTask}>
          <svg viewBox="0 0 32 32" className="check-complete">
            <polygon points="30,5.077 26,2 11.5,22.5 4.5,15.5 1,19 12,30"></polygon>
          </svg>
        </button>
    }

    input = <input
            ref="childInput"
            type="text"
            className="task-input"
            value={this.state.name}
            id={this.state.id}
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
        </li>
    )
  }
});

module.exports = TaskIndexItem;
