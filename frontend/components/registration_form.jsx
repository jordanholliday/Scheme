var React = require('react'),
    ReactDOM = require('react-dom'),
    Dropzone = require('react-dropzone'),
    FormUtil = require('../util/form_util'),
    Modal = require('react-modal');

var customStyles = {
  content : {
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginTop: '150px',
    transform: 'translateX(-50%)',
    border: '1px solid #A1A4AA',
    borderRadius: '3px',
    boxShadow: '0 2px 3px rgba(0,0,0,0.3)',
    padding: '0'
  },
  overlay : {
     position: 'fixed',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     backgroundColor: 'rgba(103,109,118,0.6)'
   }
};

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

  componentWillMount: function () {
    Modal.setAppElement(document.body);
  },

  componentDidMount: function () {
    this.setState({emailValid: FormUtil.validateEmail(this.refs.emailInput.value)});
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

  toggleWalkenModal: function (e) {
    this.setState({walkenModalOpen: !this.state.walkenModalOpen});
  },

  renderValidCheckmark: function () {
    return (
      <svg className="confirm" viewBox="0 0 32 32">
        <polygon points="30,5.077 26,2 11.5,22.5 4.5,15.5 1,19 12,30"></polygon>
      </svg>
    );
  },

  renderWalkenModal: function () {
    return (
      <Modal className="scheme-modal" isOpen={this.state.walkenModalOpen} style={customStyles}>
        <p onClick={this.toggleWalkenModal}>CLOSE CLOSE<br />CLOSE CLOSE </p>
        <img src="http://i.imgur.com/FrTo1Uw.jpg" />
      </Modal>
    );
  },

  render: function () {
    return (
       <div className="group auth-fullscreen">

         {this.renderWalkenModal()}

         <div className="login-logo" onClick={this.toggleWalkenModal}/>

         <div className="group auth-dialog">

           <h1>Please start by completing your profile.</h1>

           <form onSubmit={this.handleSubmit}>

            <Dropzone
              onDrop={this.onDrop}
              accept='image/*'
              multiple={false}
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
                {this.state.nameValid ? this.renderValidCheckmark() : null}
             </div>

             <div className="input">
               <label htmlFor="email">Work Email</label><br />
               <input
                  type="email"
                  name="user[email]"
                  id="email"
                  ref="emailInput"
                  value={this.state.email}
                  onChange={this.updateEmail}
                  onBlur={this.showEmailError}/>
               {this.state.emailValid ? this.renderValidCheckmark() : null}
             </div>

             <div className="input password">
               <label htmlFor="password">Password</label><br />
               <input
                  type="password"
                  name="user[password]"
                  id="password"
                  onChange={this.updatePassword}/>
                {this.state.passwordValid ? this.renderValidCheckmark() : null}
             </div>

             <div className="submit">
               <button disabled={!this.validateForm()}>Continue</button>
             </div>
           </form>
         </div>

         <footer className="group registration">
           <ul>
             <li><a href="http://jordanholliday.com">About Scheme</a></li>
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
      router.push('/projects/0')
    })
  },

  updateName: function (e) {
    e.stopPropagation();
    var input = e.currentTarget.value;
    this.setState({
      name: input,
      nameValid: FormUtil.validateLength(input, 1)
     });

    this.validateForm();
  },

  updateEmail: function (e) {
    e.stopPropagation();
    var input = e.currentTarget.value;
    this.setState({
      emailValid: FormUtil.validateEmail(input),
      email: input
    });

    this.validateForm();
  },

  updatePassword: function (e) {
    e.stopPropagation();
    var input = e.currentTarget.value;
    this.setState({
      password: input,
      passwordValid: FormUtil.validateLength(input, 6)
    });
  },

  validateForm: function () {
    return this.state.nameValid && this.state.emailValid && this.state.passwordValid;
  }

});

module.exports = RegistrationForm;
