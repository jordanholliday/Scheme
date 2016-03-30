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

  updateTaskName: function (task) {
    $.ajax({
      type: 'PATCH',
      url: 'api/tasks/' + task.id,
      dataType: 'json',
      data: {task: task},
      success: function (task) {
        console.log(task);
      },
      error: function () {
        console.log("ApiUtil#fetchTasks error");
      }
    });
  },
};

module.exports = ApiUtil;
