var React = require('react'),
    ReactDOM = require('react-dom'),
    ApiUtil = require('../util/api_util'),
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


var NavBar = React.createClass({
  getInitialState: function () {
    return {showOmniBox: false, showInviteModal: false, inputEmail: null, validInviteEmail: false};
  },

  componentWillMount: function () {
    Modal.setAppElement(document.body);
  },

  toggleOmniBox: function (e) {
    e.stopPropagation();
    this.setState({showOmniBox: !this.state.showOmniBox});
  },

  showInviteModal: function (e) {
    e.stopPropagation();
    this.setState({showInviteModal: true, showOmniBox: false});
  },

  hideInviteModal: function (e) {
    e.stopPropagation();
    this.refs.inviteEmailInput.value = "";
    this.setState({showInviteModal: false, validInviteEmail: false});
  },

  validateInviteEmail: function (e) {
    var inviteEmail = e.currentTarget.value;

    if (!inviteEmail) {
      this.setState({validInviteEmail: false});
      return;
    }

    var atSignIndex = inviteEmail.indexOf("@");
    var dotIndex = inviteEmail.slice(atSignIndex + 1).indexOf(".");

    if (atSignIndex > 0 && dotIndex > 0 ) {
      this.setState({validInviteEmail: true});
    } else {
      this.setState({validInviteEmail: false});
    }
  },

  apiCreateInvite: function (e) {
    e.preventDefault();
    ApiUtil.createInvite({email: this.refs.inviteEmailInput.value});
    this.setState({showInviteModal: false});
  },

  omniBoxRender: function () {
    return (
        <div>
          <div className="omni-box arrow"></div>
          <ul className="omni-box">
            <li onClick={this.showInviteModal}>
              <svg viewBox="0 0 32 32">
                <path d="M20.073,18.606C22.599,16.669,24,12.995,24,9.412C24,4.214,21.054,0,16,0S8,4.214,8,9.412 c0,3.584,1.401,7.257,3.927,9.194C6.182,20.351,2,25.685,2,32h2c0-6.617,5.383-12,12-12s12,5.383,12,12h2 C30,25.685,25.818,20.351,20.073,18.606z M10,9.412C10,4.292,13.013,2,16,2s6,2.292,6,7.412C22,13.633,19.756,18,16,18 C12.244,18,10,13.633,10,9.412z"></path>
              </svg>
              <label>Invite</label>
            </li>
          </ul>
        </div>
      );
  },

  modalRender: function () {
    return (
      <Modal className="invite-modal" isOpen={this.state.showInviteModal} style={customStyles}>
        <header className="group">
          <h2>Invite Someone to Scheme</h2>
          <button className="close-modal" onClick={this.hideInviteModal}>
            <svg viewBox="0 0 32 32"><polygon points="23.778,5.393 16,13.172 8.222,5.393 5.393,8.222 13.172,16 5.393,23.778 8.222,26.607 16,18.828 23.778,26.607 26.607,23.778 18.828,16 26.607,8.222" data-reactid=".t.0.0:0.1.0.0"></polygon></svg>
          </button>
        </header>
        <form>
          <div className="group">
            <input type="invite[email]" id="email" placeholder="name@company.com" ref="inviteEmailInput" onChange={this.validateInviteEmail}/>
            <label htmlFor="email">Email Address</label>
            <br />
            <p>Your co-conspirator will get an email that gives them access to this team.</p>
          </div>
          <button onClick={this.apiCreateInvite} disabled={!this.state.validInviteEmail}>Invite</button>
        </form>
      </Modal>
    );
  },

  hamburgerButtonRender: function () {
    return (
      <button className="hamburger-button">
        <svg viewBox="0 0 32 32">
          <path d="M28,4H4C2.895,4,2,4.895,2,6v0c0,1.105,0.895,2,2,2h24c1.105,0,2-0.895,2-2v0C30,4.895,29.105,4,28,4z" data-reactid=".1.0.0.0.0"></path><path d="M28,24H4c-1.105,0-2,0.895-2,2v0c0,1.105,0.895,2,2,2h24c1.105,0,2-0.895,2-2v0C30,24.895,29.105,24,28,24z" data-reactid=".1.0.0.0.1"></path><path d="M28,14H4c-1.105,0-2,0.895-2,2v0c0,1.105,0.895,2,2,2h24c1.105,0,2-0.895,2-2v0C30,14.895,29.105,14,28,14z" data-reactid=".1.0.0.0.2"></path>
        </svg>
      </button>
    );
  },

  render: function () {
    return (
      <header className="group main-top-nav">
        {this.modalRender()}
        {this.hamburgerButtonRender()}
        <button className="omni-button" onClick={this.toggleOmniBox} >
          <svg viewBox="0 0 32 32" data-reactid=".1.3.0:$button.0"><polygon points="28,14 18,14 18,4 14,4 14,14 4,14 4,18 14,18 14,28 18,28 18,18 28,18" data-reactid=".1.3.0:$button.0.0"></polygon></svg>
        </button>
        <button onClick={ApiUtil.logout}>Log Out</button>
        {this.state.showOmniBox ? this.omniBoxRender() : null}
      </header>
      );
  }
});

module.exports = NavBar;
