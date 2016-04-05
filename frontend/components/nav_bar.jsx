var React = require('react'),
    ReactDOM = require('react-dom'),
    ApiUtil = require('../util/api_util');

var NavBar = React.createClass({
  render: function () {
    return (
      <header>
          <button onClick={ApiUtil.logout}>Log Out</button>
      </header>
      );
  }
});

module.exports = NavBar;
