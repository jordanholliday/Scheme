var React = require('react'),
    ReactDOM = require('react-dom');

var LoginForm = React.createClass({

  contextTypes: function () {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      name: "",
      password: ""
    }
  },

  render: function () {
    return (
        <div className="auth-fullscreen">
          <h1>Please Log in</h1>

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input onChange={this.updateName} type="text" value={this.state.name}/>

            <label htmlFor="password">Password</label>
            <input onChange={this.updatePassword} type="password" value={this.state.password}/>

            <button>Submit</button>
          </form>
        </div>
    );
  },

  handleSubmit: function () {
    e.preventDefault();

    var router = this.context.router;
    ApiUtil.login(this.state, function () {
      router.push('/tasks')
    })
  },

  updateName: function (e) {
    this.setState({ name: e.currentTarget.value });
  },

  updateName: function (e) {
    this.setState({ password: e.currentTarget.value });
  }
});

module.exports = LoginForm;
