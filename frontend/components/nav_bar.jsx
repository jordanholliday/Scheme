var React = require('react'),
    ReactDOM = require('react-dom'),
    ApiUtil = require('../util/api_util'),
    Modal = require('react-modal');

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};


var NavBar = React.createClass({
  getInitialState: function () {
    return {showOmniBox: false, showInviteModal: true};
  },

  toggleOmniBox: function (e) {
    e.stopPropagation();
    this.setState({showOmniBox: !this.state.showOmniBox});
  },

  toggleInviteModal: function (e) {
    e.stopPropagation();
    this.setState({showInviteModal: !this.state.showInviteModal});
  },

  omniBoxRender: function () {
    return (
        <div>
        <Modal isOpen={true} />
          <div className="omni-box arrow"></div>
          <ul className="omni-box">
            <li>
              <svg viewBox="0 0 32 32">
                <path d="M20.073,18.606C22.599,16.669,24,12.995,24,9.412C24,4.214,21.054,0,16,0S8,4.214,8,9.412 c0,3.584,1.401,7.257,3.927,9.194C6.182,20.351,2,25.685,2,32h2c0-6.617,5.383-12,12-12s12,5.383,12,12h2 C30,25.685,25.818,20.351,20.073,18.606z M10,9.412C10,4.292,13.013,2,16,2s6,2.292,6,7.412C22,13.633,19.756,18,16,18 C12.244,18,10,13.633,10,9.412z"></path>
              </svg>
              <label>Invite</label>
            </li>
          </ul>
        </div>
      );
  },

  render: function () {
    return (
      <header>
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
