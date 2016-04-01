var AppDispatcher = require('../dispatcher/dispatcher'),
    SessionConstants = require('../constants/session_constants');

var SessionActions = {
  currentUserReceived: function(currentUser) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.CURRENT_USER_RECEIVED,
      currentUser: currentUser
    });
  },

  logout: function() {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
  }
};

module.exports = SessionActions;
