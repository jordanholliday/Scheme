var React = require('react'),
    ReactDOM = require('react-dom'),
    ApiUtil = require('../util/api_util');

var NavBar = React.createClass({
  render: function () {
    return (
      <header>
        <span onClick={ApiUtil.logout}>
          lOg oUt!
        </span>
      </header>
      );
  }
});

module.exports = NavBar;
