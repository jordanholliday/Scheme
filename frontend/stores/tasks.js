var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    ApiConstants = require('../constants/api_constants'),
    TaskConstants = require('../constants/task_constants'),
    ProjectStore = require('./projects');

var _tasks = {};
var TaskStore = new Store(AppDispatcher);

TaskStore.all = function () {
  var singleTaskId = Object.keys(_tasks)[0];
  if (!singleTaskId) {return []};
  var projectId = _tasks[singleTaskId].project_id;
  if (ProjectStore.findProject(projectId)) {
    var lastTaskId = ProjectStore.findProject(projectId).last_task_id;
    return sortTasks(_tasks, lastTaskId);
  }
};

TaskStore.find = function (id) {
  return _tasks[id];
};

TaskStore.clearTasks = function () {
  _tasks = {};
};

var resetTasks = function (newTasks) {
  _tasks = {};
  for (var j = 0; j < newTasks.length; j++) {
    var currentTask = newTasks[j];
    _tasks[currentTask.id] = currentTask;
    _tasks[currentTask.id].persisted = true;
  }
};

var receiveOneTask = function (task) {
  task.project = null;
  _tasks[task.id] = task;
  _tasks[task.id].persisted = true;
};

var receiveOneUnpersistedTask = function (task) {
  _tasks[task.id] = task;
  _tasks[task.id].persisted = false;
};

var sortTasks = function (tasksObj, lastTaskId) {
  // start by inserting last task
  var taskArr = [tasksObj[lastTaskId]];
  // then insert the previous, previous, previous...
  while (taskArr[0].previous_task_id) {
    taskArr.unshift(tasksObj[taskArr[0].previous_task_id]);
  }

  return taskArr;
};

TaskStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ApiConstants.RECEIVE_TASKS:
      resetTasks(payload.tasks);
      TaskStore.__emitChange();
      break;
    case ApiConstants.RECEIVE_ONE_TASK:
      receiveOneTask(payload.task);
      TaskStore.__emitChange();
      break;
    case TaskConstants.UPDATE_TASK_IN_STORE:
      receiveOneUnpersistedTask(payload.task);
      TaskStore.__emitChange();
      break;
  }
};

module.exports = TaskStore;
