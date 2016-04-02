var ApiConstants = require('../constants/api_constants'),
    AppDispatcher = require('../dispatcher/dispatcher.js');

ApiActions = {
  recieveAll: function (tasks) {
    AppDispatcher.dispatch({
      actionType: ApiConstants.RECEIVE_TASKS,
      tasks: tasks
    });
  },

  receiveOneTask: function (task) {
    AppDispatcher.dispatch({
      actionType: ApiConstants.RECEIVE_ONE_TASK,
      task: task
    });
  },

  receiveAllTeamUsers: function (teamUsers) {
    AppDispatcher.dispatch({
      actionType: ApiConstants.RECEIVE_ALL_TEAM_USERS,
      teamUsers: teamUsers
    });
  }
};

module.exports = ApiActions;
