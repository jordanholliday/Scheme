var React = require('react'),
    ReactDOM = require('react-dom'),
    Dropzone = require('react-dropzone');

var RegistrationForm = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    var email;
    if (this.props.location.state && this.props.location.state.email) {
      email = this.props.location.state.email;
    } else {
      email = "";
    }

    return {
      name: "",
      email: email,
      password: "",
      avatar: null,
      avatarFile: null
    }
  },

  onDrop: function (file) {
    document.getElementById("dropzone").style.backgroundImage = "url('" + file[0].preview + "')";
    document.getElementById("dropzone").className = "upload-div received";
    var reader = new FileReader();
    var newAvatar = file[0];
    reader.onloadend = function() {
      this.setState({ avatar: reader.result, avatarFile: newAvatar});
    }.bind(this);

    if (newAvatar) {
      reader.readAsDataURL(newAvatar);
    } else {
      this.setState({ avatar: null, avatarFile: null });
    }
  },

  render: function () {
    return (
       <div className="group auth-fullscreen">

         <div className="login-logo" />

         <div className="group auth-dialog">

           <h1>Please start by completing your profile.</h1>

           <form onSubmit={this.handleSubmit}>

            <Dropzone
              onDrop={this.onDrop}
              accept='application/pdf'
              multiple={false}
              disableClick={true}
              className="upload-div"
              activeClassName="upload-div-active"
              id="dropzone">
            </Dropzone>

             <div className="input">
               <label htmlFor="name">Full Name</label><br />
               <input
                  type="text"
                  name="user[name]"
                  id="name"
                  onChange={this.updateName} />
             </div>

             <div className="input">
               <label htmlFor="email">Work Email</label><br />
               <input
                  type="email"
                  name="user[email]"
                  id="email"
                  value={this.state.email}
                  onChange={this.updateEmail}/>
               <svg className="confirm" viewBox="0 0 32 32">
                 <polygon points="30,5.077 26,2 11.5,22.5 4.5,15.5 1,19 12,30"></polygon>
               </svg>
             </div>

             <div className="input password">
               <label htmlFor="password">Password</label><br />
               <input
                  type="password"
                  name="user[password]"
                  id="password"
                  onChange={this.updatePassword}/>
             </div>

             <div className="submit">
               <button>Continue</button>
             </div>
           </form>
         </div>

         <footer className="group registration">
           <ul>
             <li><Link to="#">About Scheme</Link></li>
             <li><a href="http://jordanholliday.com">Blog</a></li>
           </ul>
           <div className="toggle-auth">
             Got an account?
             <Link to="/login" className="button">Log In</Link>
           </div>
         </footer>
       </div>
    )
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var router = this.context.router;
    ApiUtil.register(this.state, function () {
      router.push('/tasks')
    })
  },

  updateName: function (e) {
    this.setState({ name: e.currentTarget.value });
  },

  updateEmail: function (e) {
    this.setState({ email: e.currentTarget.value });
  },

  updatePassword: function (e) {
    this.setState({ password: e.currentTarget.value });
  }
});

module.exports = RegistrationForm;
