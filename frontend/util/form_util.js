var FormUtil = {

  validateEmail: function (emailInput) {

    if (!emailInput) {
      return false
    }

    var atSignIndex = emailInput.indexOf("@");
    var dotIndex = emailInput.slice(atSignIndex + 1).indexOf(".");

    if (atSignIndex > 0 && dotIndex > 0 ) {
      return true;
    } else {
      return false;
    }
  },

  validateLength: function (input, minChar) {
    return input.length >= minChar;
  },

  validateForm: function () {
    return this.state.nameValid && this.state.emailValid && this.state.passwordValid;
  }

};

module.exports = FormUtil;
