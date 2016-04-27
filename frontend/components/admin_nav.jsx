var React = require('react'),
    SessionStore = require('../stores/sessions'),
    ApiUtil = require('../util/api_util');

var AdminNav = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
        showAdminNavDropdown: false,
        currentUser: SessionStore.currentUser()
      };
  },

  getCurrentUserFromStore: function () {
    if (!SessionStore.currentUser()) {
      this.context.router.push("/login");
    } else {
      this.setState({
        currentUser: SessionStore.currentUser()
      });
    }
  },

  componentDidMount: function () {
    this.sessionStoreToken = SessionStore.addListener(this.getCurrentUserFromStore);
  },

  componentWillUnmount: function () {
    this.sessionStoreToken.remove();
  },

  toggleAdminNavDropdown: function () {
    this.setState({showAdminNavDropdown: !this.state.showAdminNavDropdown});
  },

  renderAdminNavDropdown: function () {
    return (
      <div className="admin-nav-dropdown">
        <ul>
          <li>
            <a href="http://jordanholliday.com" target="_blank">
              Love Scheme? Hire me!
            </a>
          </li>
          <li onClick={ApiUtil.logout}>
            Log Out
          </li>
        </ul>
      </div>
    );
  },

  render: function () {
    return (
      <div
        className="admin-nav" onClick={this.toggleAdminNavDropdown}>
        <span>{this.state.currentUser.email}</span>
        <img className="avatar" src={this.state.currentUser.avatar_url} />
        {this.state.showAdminNavDropdown ? this.renderAdminNavDropdown() : null}
      </div>
    )
  }
});

module.exports = AdminNav;
