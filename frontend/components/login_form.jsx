var React = require('react'),
    ReactDOM = require('react-dom');

var LoginForm = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      email: "",
      password: ""
    }
  },

  render: function () {
    return (
      <div className="auth-fullscreen">

        <div className="login-logo">
          <img src="assets/scheme_logo.png" />
        </div>

        <div className="group auth-dialog login">

          <h1>Log In</h1>

          <form onSubmit={this.handleSubmit}>

            <div className="google-auth">
              <button>FPO Use Google Account</button>
            </div>

            <div className="separator">
              or
            </div>

            <div className="input">
              <label htmlFor="email">Email</label><br />
              <input
                type="text"
                name="user[email]"
                id="email"
                onChange={this.updateEmail} />
            </div>

            <div className="input">
              <label htmlFor="password">Password</label><br />
              <input
                type="password"
                name="user[password]"
                id="password"
                onChange={this.updatePassword}/>
            </div>

            <div className="submit">
              <button>Log In</button>
            </div>
          </form>
        </div>

        <footer className="group login">
          <ul>
            <li><a href="#">About Scheme</a></li>
            <li><a href="http://jordanholliday.com">Blog</a></li>
          </ul>
          <div className="toggle-auth">
            Don't have an account?
             <a href="/login" className="button">Sign Up</a>
          </div>
        </footer>
      </div>
    )
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var router = this.context.router;
    ApiUtil.login(this.state, function () {
      router.push('/tasks')
    })
  },

  updateEmail: function (e) {
    this.setState({ email: e.currentTarget.value });
  },

  updatePassword: function (e) {
    this.setState({ password: e.currentTarget.value });
  }
});

module.exports = LoginForm;
