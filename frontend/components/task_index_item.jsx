var React = require('react'),
    ReactDOM = require('react-dom');

var TaskIndexItem = React.createClass({
  render: function () {
    return <li>{this.props.task.name}</li>;
  }
});

module.exports = TaskIndexItem;
