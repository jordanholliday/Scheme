var React = require('react'),
    ReactDOM = require('react-dom');

var TaskIndexItem = React.createClass({
  render: function () {
    return <li className="task-index-item">{this.props.task.name}</li>;
  }
});

module.exports = TaskIndexItem;
