var TaskConstants = require('../constants/task_constants'),
    AppDispatcher = require('../dispatcher/dispatcher.js');

TaskActions = {
  updateTaskInStore: function (task) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.UPDATE_TASK_IN_STORE,
      task: task
    });
  }
};

module.exports = TaskActions;
