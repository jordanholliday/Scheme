var React = require('react'),
    ReactDOM = require('react-dom');

var SplashPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {email: ""};
  },

  updateEmail: function (e) {
    this.setState({ email: e.currentTarget.value });
  },

  sendToRegistration: function () {
    event.preventDefault();
    var router = this.context.router;
    router.push({
      pathname: '/register',
      state: { email: this.state.email }
    })
  },

  render: function () {
    return (
      <div>
        <nav className="group splash-page">
          <div className="container">
            <div className="logo">
            </div>
            <button onClick={this.sendToRegistration}>Log In</button>
          </div>
        </nav>
        <main>
          <section className="leader">
            <h1>Stay Scheming</h1>
            <h2>Scheme is the second easiest way for teams to track their work—and get results.</h2>
            <input
              type="text"
              name="user[email]"
              id="email"
              onChange={this.updateEmail}
              placeholder="name@company.com" />
              <button onClick={this.sendToRegistration}>Get Started for FREE</button>
          </section>
        </main>
      </div>
      )
  }
});


module.exports = SplashPage;
