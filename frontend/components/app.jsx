var React = require('react'),
    ReactDOM = require('react-dom'),
    SessionStore = require('../stores/sessions.js'),
    NavBar = require('./nav_bar')
    ApiUtil = require('../util/api_util.js');

var App = React.createClass({
  render: function () {
    return (
      <div className="app">
        <NavBar />
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
