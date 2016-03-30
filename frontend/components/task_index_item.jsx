var React = require('react'),
    ReactDOM = require('react-dom');

var TaskIndexItem = React.createClass({
  getInitialState: function () {
    if (this.props.task) {
      return {
        name: this.props.task.name,
        id: this.props.task.id
      };
    } else {
      return {
        name: null,
        id: $('.task-input').length + 835
      }
    }
  },

  handleType: function () {
    var id = "#" + this.state.id;
    this.setState({name: $(id).val()})
  },

  saveNameChange: function () {
    ApiUtil.updateTaskName({
      id: this.props.task.id,
      name: this.state.name
    })
  },

  render: function () {
    return (
      <li className="task-index-item">
        <input
          type="text"
          className="task-input"
          value={this.state.name}
          id={this.state.id}
          onChange={this.handleType}
          onBlur={this.saveNameChange} />
      </li>
    );
  }
});

module.exports = TaskIndexItem;
