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
  _projects[project.id] = project;
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
    case ApiConstants.RECEIVE_ONE_PROJECT:
      receiveOneProject(payload.project);
      ProjectStore.__emitChange();
      break;
  }
};

module.exports = ProjectStore;
