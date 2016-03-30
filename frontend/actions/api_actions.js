var ApiConstants = require('../constants/api_constants');

ApiActions = {
  recieveAll: function (tasks) {
    AppDispatcher.dispatch({
      actionType: ApiConstants.TASKS_RECEIVED,
      tasks: tasks
    });
  }
};

module.exports = ApiActions;
