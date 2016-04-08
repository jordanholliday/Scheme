var React = require('react'),
    ReactDOM = require('react-dom'),
    FormUtil = require('../util/form_util');

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

  renderValidCheckmark: function () {
    return (
      <svg className="confirm" viewBox="0 0 32 32">
        <polygon points="30,5.077 26,2 11.5,22.5 4.5,15.5 1,19 12,30"></polygon>
      </svg>
    );
  },

  render: function () {
    return (
      <div className="auth-fullscreen">

        {this.renderWalkenModal()}

        <div className="login-logo" />

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
              {this.state.emailValid ? this.renderValidCheckmark() : null}
            </div>

            <div className="input">
              <label htmlFor="password">Password</label><br />
              <input
                type="password"
                name="user[password]"
                id="password"
                onChange={this.updatePassword}/>
              {this.state.passwordValid ? this.renderValidCheckmark() : null}
            </div>

            <div className="submit">
              <button disabled={!this.validateForm()}>Log In</button>
            </div>
          </form>
        </div>

        <footer className="group login">
         <ul>
           <li><Link to="#">About Scheme</Link></li>
           <li><a href="http://jordanholliday.com">Blog</a></li>
         </ul>
         <div className="toggle-auth">
           New here?
           <Link to="/register" className="button">Sign Up</Link>
         </div>
        </footer>
      </div>
    )
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var router = this.context.router;
    ApiUtil.login(this.state, function () {
      router.push('/projects/0')
    })
  },

  updateEmail: function (e) {
    var input = e.currentTarget.value;
    this.setState({
      emailValid: FormUtil.validateEmail(input),
      email: input
    });
  },

  updatePassword: function (e) {
    var input = e.currentTarget.value;
    this.setState({
      password: input,
      passwordValid: FormUtil.validateLength(input, 6)
    });
  },

  validateForm: function () {
    return this.state.emailValid && this.state.passwordValid;
  }
});

module.exports = LoginForm;
