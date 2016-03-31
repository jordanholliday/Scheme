var React = require('react'),
    ReactDOM = require('react-dom'),
    TaskStore = require('../stores/tasks');

var TaskDetail = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {task: TaskStore.find(this.props.params.taskId)}
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({task: TaskStore.find(newProps.params.taskId)});
  },

  componentDidMount: function () {
    this.taskStoreToken = TaskStore.addListener(this.setStateFromStore);
  },

  componentWillUnmount: function () {
    TaskStore.remove(this.taskStoreToken);
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
  },

  render: function () {
    if (this.state.task) {
      return (
        <div>
          <p>{this.state.task.name}</p>
          <p>{this.state.task.description}</p>
        </div>
      );
    } else {
      return (<div>loading...</div>);
    }
  }
});

module.exports = TaskDetail;
