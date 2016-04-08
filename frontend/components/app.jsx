var React = require('react'),
    ReactDOM = require('react-dom'),
    SessionStore = require('../stores/sessions.js'),
    NavBar = require('./nav_bar')
    ApiUtil = require('../util/api_util.js'),
    TaskStore = require('../stores/tasks');

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      currentUser: null
    }
  },

  componentDidMount: function () {
    this.sessionStoreToken = SessionStore.addListener(this.handleChange);
  },

  componentWillUnmount: function () {
    this.sessionStoreToken.remove();
  },

  handleChange: function () {
    if (SessionStore.isLoggedIn()) {
      this.setState({ currentUser: SessionStore.currentUser() })
    } else {
      TaskStore.clearTasks();
      this.context.router.push('/login');
    }
  },

  render: function () {
    return (
      <div className="app-component-wrapper">
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
