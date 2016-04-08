var React = require('react'),
    ReactDOM = require('react-dom'),
    ApiUtil = require('../util/api_util'),
    Modal = require('react-modal');

// For universal config of Scheme Modals

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
    padding: '0',
    'min-width': '520px'
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

// Required props:
// -showInviteModal (boolean)
// modalHeader (string)
// hideInviteModal (fn)
// inputAttrs = {
//  label (string)
//  id (string)
//  placeholder (string)
//  ref (string)
//  validation (fn)
//  micetype (string)
// }
// submit (fn)
// validInput (boolean)
// submitButtonText (string)

var SchemeModal = React.createClass({

  getInitialState: function () {
    return {validInput: false};
  },

  validateInput: function () {
    this.setState({validInput: this.props.inputValidation(this.refs.inputField.value)});
  },

  componentDidMount: function () {
    this.validateInput();
  },

  handleSubmit: function (e) {
    e.preventDefault();
    this.props.inputSubmit(this.refs.inputField.value);
  },

  render: function () {
    return (
      <Modal className="scheme-modal" isOpen={this.props.showInviteModal} style={customStyles}>
        <header className="group">
          <h2>{this.props.modalHeader}</h2>
          <button className="close-modal" onClick={this.props.hideInviteModal}>
            <svg viewBox="0 0 32 32"><polygon points="23.778,5.393 16,13.172 8.222,5.393 5.393,8.222 13.172,16 5.393,23.778 8.222,26.607 16,18.828 23.778,26.607 26.607,23.778 18.828,16 26.607,8.222" ></polygon></svg>
          </button>
        </header>
        <form>
          <div className="group">
            <input
              type="text"
              id={this.props.inputId}
              placeholder={this.props.inputPlaceholder}
              ref="inputField"
              onChange={this.validateInput}/>
            <label htmlFor="email">{this.props.inputLabel}</label>
            <br />
            <p>{this.props.inputMicetype}</p>
          </div>
          <button onClick={this.handleSubmit} disabled={!this.state.validInput}>{this.props.submitButtonText}</button>
        </form>
      </Modal>
    );
  }
});

module.exports = SchemeModal;
