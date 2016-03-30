var ApiConstants = require('../constants/api_constants'),
    AppDispatcher = require('../dispatcher/dispatcher.js');

ApiActions = {
  recieveAll: function (tasks) {
    AppDispatcher.dispatch({
      actionType: ApiConstants.RECEIVE_TASKS,
      tasks: tasks
    });
  }
};

module.exports = ApiActions;
