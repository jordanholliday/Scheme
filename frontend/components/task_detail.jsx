var React = require('react'),
    ReactDOM = require('react-dom'),
    TaskStore = require('../stores/tasks'),
    TaskActions = require('../actions/task_actions'),
    ApiUtil = require('../util/api_util.js'),
    TaskOptions = require('./task_options'),
    TaskComment = require('./task_comment'),
    TaskCommentForm = require('./task_comment_form');

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
      this.context.router.push("/projects/" + this.props.params.projectId)
    }
  },

  redirectToTaskProject: function () {
    this.context.router.push("/projects/" + this.props.params.projectId);
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({task: TaskStore.find(newProps.params.taskId)});
    // when task not found, go back TaskIndex
    if (!this.state.task) {
      this.routeToTaskIndexIfTaskNull();
    } else {
      ApiUtil.fetchOneTask(this.props.params.taskId);
    }
  },

  componentDidMount: function () {
    this.taskStoreToken = TaskStore.addListener(this.setStateFromStore);
    ApiUtil.fetchOneTask(this.props.params.taskId);
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
      completed: true,
      projectId: this.state.task.project_id
    })
  },

  renderComments: function () {
    var commentsArr = [];
    if (this.state.task.comments.length === 0) {
      return null;
    } else {
      this.state.task.comments.forEach( function (comment) {
        commentsArr.push(<TaskComment comment={comment} key={comment.id} />);
      });
    }

    return (
      <div>
        {commentsArr}
      </div>
    );
  },

  render: function () {
    if (this.state.task) {
      return (
        <section className="task-detail">

          <TaskOptions task={this.state.task} />
          <section className="task-project-name">
            <h3 onClick={this.redirectToTaskProject}>{this.state.task.project_name}</h3>
          </section>

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

          {this.state.task.comments ? this.renderComments() : null}

          <TaskCommentForm taskId={this.props.params.taskId}/>
        </section>
      );
    } else {
      return (<div></div>);
    }
  }
});

module.exports = TaskDetail;
