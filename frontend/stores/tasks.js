var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    ApiConstants = require('../constants/api_constants'),
    TaskConstants = require('../constants/task_constants'),
    ProjectStore = require('./projects'),
    ApiUtil = require('../util/api_util');

var _tasks = {};
var TaskStore = new Store(AppDispatcher);

// Listen for Pusher events
var pusher = new Pusher('339ad311e14d0e26b9c3', {
    encrypted: true
  });

var channel = pusher.subscribe('task_channel');
channel.bind('new_comment', function(data) {
    // check that task attached to comment is in current project
    if (!_tasks[data.task_id]) {return;}
    ApiUtil.fetchOneTask(data.task_id);
  });
channel.bind('new_task', function(data) {
    var singleTaskId = Object.keys(_tasks)[0];
    if (_tasks[singleTaskId].project_id !== data.project_id) {return;}
    ApiUtil.fetchOneTask(data.task_id);
  });

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
  // clear out excess project data
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
  // then insert the previous task, until !previous_task_id
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
