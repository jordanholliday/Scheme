var ApiActions = require('../actions/api_actions');

ApiUtil = {
  fetchTasks: function () {
    $.ajax({
      type: 'GET',
      url: 'api/tasks',
      dataType: 'json',
      success: function (tasks) {
        console.log(tasks);
      },
      error: function () {
        console.log("ApiUtil#fetchTasks error");
      }
    });
  }
};

module.exports = ApiUtil;
