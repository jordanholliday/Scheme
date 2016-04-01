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

         <div className="login-logo">
           <img src="assets/scheme_logo.png" />
         </div>

         <div className="group auth-dialog">

           <h1>Please start by completing your profile.</h1>

           <form onSubmit={this.handleSubmit}>

             <div className="upload-div">
               <p>Add Photo</p>
             </div>

             <div className="input">
               <label for="name">Full Name</label><br />
               <input type="text" name="user[name]" id="name" />
             </div>

             <div className="input">
               <label for="email">Work Email</label><br />
               <input type="email" name="user[email]" id="email" />
               <svg className="confirm" viewBox="0 0 32 32">
                 <polygon points="30,5.077 26,2 11.5,22.5 4.5,15.5 1,19 12,30"></polygon>
               </svg>
             </div>

             <div className="input password">
               <label for="password">Password</label><br />
               <input type="password" name="user[password]" id="password" />
             </div>

             <div className="submit">
               <button>Continue</button>
             </div>
           </form>
         </div>

         <footer className="group registration">
           <ul>
             <li><a href="#">About Scheme</a></li>
             <li><a href="http://jordanholliday.com">Blog</a></li>
           </ul>
           <div className="toggle-auth">
             Got an account?
             <a href="/users/new" className="button">Log In</a>
           </div>
         </footer>
       </div>
    )
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

module.exports = RegistrationForm;
