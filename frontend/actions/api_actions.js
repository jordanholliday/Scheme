var ApiConstants = require('../constants/api_constants'),
    AppDispatcher = require('../dispatcher/dispatcher.js');

ApiActions = {
  recieveAll: function (tasks) {
    AppDispatcher.dispatch({
      actionType: ApiConstants.RECEIVE_TASKS,
      tasks: tasks
    });
  },

  updateTaskName: function (task) {
    AppDispatcher.dispatch({
      actionType: ApiConstants.UPDATE_TASK_NAME,
      task: task
    });
  }
};

module.exports = ApiActions;
