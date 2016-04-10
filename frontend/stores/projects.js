var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    ApiConstants = require('../constants/api_constants');

var _projects = {};
var _currentProject = null;
var ProjectStore = new Store(AppDispatcher);

function _setCurrentProject (project) {
  _currentProject = project;
}

var resetProjects = function (receivedProjects) {
  _projects = {};
  for (var j = 0; j < receivedProjects.length; j++) {
    var idxProject = receivedProjects[j];
    _projects[idxProject.id] = idxProject;
  }

  _setCurrentProject(ProjectStore.all()[0]);
};

var receiveOneProject = function (project) {
  if (project) {
    _projects[project.id] = project;
  }
};

var updateLastTask = function (projectId, lastTaskId) {
  _projects[projectId].last_task_id = lastTaskId;
};

ProjectStore.all = function () {
  var projectArr = [];
  for (var id in _projects) {
    projectArr.push(_projects[id]);
  }

  return projectArr;
};

ProjectStore.getCurrentProject = function () {
  return _currentProject;
};

ProjectStore.findProject = function (id) {
  return _projects[id];
};

ProjectStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ApiConstants.RECEIVE_ALL_PROJECTS:
      resetProjects(payload.projects);
      ProjectStore.__emitChange();
      break;
    case ApiConstants.RECEIVE_ONE_TASK:
      // update project
      receiveOneProject(payload.task.project);
      ProjectStore.__emitChange();
      break;
    case ApiConstants.RECEIVE_TASKS:
      if (!payload.tasks[0]) {break}
      // update project's last task
      var projectId = payload.tasks[0].project_id;
      var lastTaskId = payload.tasks[0].project_last_task;
      updateLastTask(projectId, lastTaskId);
      ProjectStore.__emitChange();
      break;
    case ApiConstants.RECEIVE_ONE_PROJECT:
      receiveOneProject(payload.project);
      ProjectStore.__emitChange();
      break;
  }
};

module.exports = ProjectStore;
