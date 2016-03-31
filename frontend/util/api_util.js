var ApiActions = require('../actions/api_actions');

ApiUtil = {
  fetchTasks: function () {
    $.ajax({
      type: 'GET',
      url: 'api/tasks',
      dataType: 'json',
      success: function (tasks) {
        ApiActions.recieveAll(tasks);
      },
      error: function () {
        console.log("ApiUtil#fetchTasks error");
      }
    });
  },

  createTask: function (task) {
    $.ajax({
      type: 'POST',
      url: 'api/tasks',
      dataType: 'json',
      data: {task: task},
      success: function (task) {
        ApiActions.receiveOneTask(task);
      },
      error: function () {
        console.log("ApiUtil#createTask error");
      }
    });
  },

  updateTask: function (task) {
    $.ajax({
      type: 'PATCH',
      url: 'api/tasks/' + task.id,
      dataType: 'json',
      data: {task: task},
      success: function (task) {
        ApiActions.receiveOneTask(task);
      },
      error: function () {
        console.log("ApiUtil#updateTask error");
      }
    });
  },

  completeTask: function (task) {
    var fetchCallback = this.fetchTasks;
    $.ajax({
      type: 'PATCH',
      url: 'api/tasks/' + task.id,
      dataType: 'json',
      data: {task: task},
      success: function () {
        fetchCallback();
      },
      error: function () {
        console.log("ApiUtil#updateTask error");
      }
    });
  },

  deleteTask: function (task) {
    $.ajax({
      type: 'DELETE',
      url: 'api/tasks/' + task.id,
      dataType: 'json',
      success: function (tasks) {
        ApiActions.recieveAll(tasks);
      },
      error: function () {
        console.log("ApiUtil#deleteTask error");
      }
    });
  }

};

module.exports = ApiUtil;
