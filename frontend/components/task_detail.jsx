var React = require('react'),
    ReactDOM = require('react-dom'),
    TaskStore = require('../stores/tasks'),
    TaskActions = require('../actions/task_actions'),
    ApiUtil = require('../util/api_util.js'),
    TaskOptions = require('./task_options');

var TaskDetail = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {task: TaskStore.find(this.props.params.taskId)}
  },

  routeToTaskIndexIfTaskNull: function () {
    // need to rewrite this to point toward a project index (still to come)
    if (!this.state.task) {
      this.context.router.push("/tasks")
    }
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({task: TaskStore.find(newProps.params.taskId)});

    // when task not found, go back TaskIndex
    this.routeToTaskIndexIfTaskNull();
  },

  componentDidMount: function () {
    this.taskStoreToken = TaskStore.addListener(this.setStateFromStore);
  },

  componentWillUnmount: function () {
    this.taskStoreToken.remove();
  },

  componentDidUpdate: function () {
    if (!this.refs.nameTextarea) {return}
    // resize name & description textareas to fit new(?) contents
    this._resizeTextArea(this.refs.nameTextarea);
    this._resizeTextArea(this.refs.descriptionTextarea);
  },

  getStateFromStore: function () {
    if (!this.state.task) {
      return {task: TaskStore.find(this.props.params.taskId)}
    } else {
      return {
        task: TaskStore.find(this.state.task.id)
      }
    }
  },

  setStateFromStore: function () {
    this.setState(this.getStateFromStore());
    this.routeToTaskIndexIfTaskNull();
  },

  _onChangeHandler: function () {
    this.storeUpdateTask();
  },

  storeUpdateTask: function () {
    this.state.task.name = this.refs.nameTextarea.value;
    this.state.task.description = this.refs.descriptionTextarea.value;
    TaskActions.updateTaskInStore(this.state.task);
  },

  _resizeTextArea: function (refsName) {
    $(refsName).height( 20 );
    $(refsName).height( refsName.scrollHeight );
  },

  apiUpdateTask: function () {
    ApiUtil.updateTask({
      id: this.state.task.id,
      name: this.state.task.name,
      description: this.state.task.description,
      completed: this.state.task.completed,
      deadline: this.state.task.deadline,
      assignee_id: this.state.task
    });
  },

  persistTask: function () {
    if (!this.state.task) {
      return;
    }
    if (!this.state.task.persisted) {
      this.apiUpdateTask();
    }
  },

  apiCompleteTask: function () {
    ApiUtil.completeTask({
      id: this.state.task.id,
      completed: true
    })
  },

  render: function () {
    if (this.state.task) {
      return (
        <section className="task-detail">

          <TaskOptions task={this.state.task} />

          <section className="task-options fpo"></section>

          <div className="group edit-pane-name-complete">
            <button
              className="complete-task-button"
              onClick={this.apiCompleteTask}>
              <svg viewBox="0 0 32 32" className="check-complete">
                <polygon points="30,5.077 26,2 11.5,22.5 4.5,15.5 1,19 12,30"></polygon>
              </svg>
            </button>

            <textarea
              value={this.state.task.name}
              ref="nameTextarea"
              className="task-name-input"
              onChange={this._onChangeHandler}
              onBlur={this.persistTask}
              onMouseOut={this.persistTask}>
            </textarea>
          </div>

          <div className="group task-description-block">
            <textarea
              value={this.state.task.description ? this.state.task.description : ""}
              ref="descriptionTextarea"
              className="task-description-input"
              placeholder="Description"
              onChange={this._onChangeHandler}
              onBlur={this.persistTask}
              onMouseOut={this.persistTask}>
            </textarea>
          </div>

          <div className="group task-meta block">
            <p><strong>{this.state.task.creator}</strong> created task. {this.state.task.created}.</p>
          </div>

        </section>
      );
    } else {
      return (<div></div>);
    }
  }
});

module.exports = TaskDetail;
