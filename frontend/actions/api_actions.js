var ApiConstants = require('../constants/api_constants'),
    AppDispatcher = require('../dispatcher/dispatcher.js');

ApiActions = {
  receiveAll: function (tasks) {
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
  },

  receiveAllProjects: function (projects) {
    AppDispatcher.dispatch({
      actionType: ApiConstants.RECEIVE_ALL_PROJECTS,
      projects: projects
    });
  },

  receiveOneProject: function (project) {
    AppDispatcher.dispatch({
      actionType: ApiConstants.RECEIVE_ONE_PROJECT,
      project: project
    });
  }
};

module.exports = ApiActions;
