var ApiActions = require('../actions/api_actions'),
    SessionActions=require('../actions/session_actions');

var ApiUtil = {
  fetchTasks: function () {
    $.ajax({
      type: 'GET',
      url: 'api/tasks',
      dataType: 'json',
      success: function (tasks) {
        ApiActions.receiveAll(tasks);
      },
      error: function () {
        console.log("ApiUtil#fetchTasks error");
      }
    });
  },

  fetchOneTask: function (id) {
    $.ajax({
      type: 'GET',
      url: 'api/tasks/' + id,
      dataType: 'json',
      success: function (task) {
        ApiActions.receiveOneTask(task)
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
    var fetchCallback = this.fetchProjectTasks;
    var projectId = task.projectId;
    $.ajax({
      type: 'PATCH',
      url: 'api/tasks/' + task.id,
      dataType: 'json',
      data: {task: task},
      success: function () {
        fetchCallback(projectId);
      },
      error: function () {
        console.log("ApiUtil#updateTask error");
      }
    });
  },

  reorderTasks: function (moveTaskId, inFrontOfTaskId) {
    $.ajax({
      type: 'PATCH',
      url: 'api/tasks/reorder/' + moveTaskId,
      dataType: 'json',
      data: {
        in_front_of_task_id: inFrontOfTaskId
      },
      success: function (tasks) {
        ApiActions.receiveAll(tasks);
      },
      error: function () {
        console.log("ApiUtil#fetchProjectTasks error");
      }
    });
  },

  deleteTask: function (task) {
    $.ajax({
      type: 'DELETE',
      url: 'api/tasks/' + task.id,
      dataType: 'json',
      data: {task: task},
      success: function (tasks) {
        ApiActions.receiveAll(tasks);
      },
      error: function () {
        console.log("ApiUtil#deleteTask error");
      }
    });
  },

  createInvite: function (emailObj) {
    $.ajax({
      type: 'POST',
      url: 'api/invites',
      dataType: 'json',
      data: {invite: emailObj},
      success: function (response) {
        console.log(response);
      },
      error: function () {
        console.log("ApiUtil#createInvite error");
      }
    });
  },

  createProject: function (project) {
    $.ajax({
      type: 'POST',
      url: 'api/projects',
      dataType: 'json',
      data: {project: project},
      success: function (project) {
        ApiActions.receiveOneProject(project);
      },
      error: function () {
        console.log("ApiUtil#createProject error");
      }
    });
  },

  fetchProjects: function () {
    $.ajax({
      type: 'GET',
      url: 'api/projects',
      dataType: 'json',
      success: function (projects) {
        ApiActions.receiveAllProjects(projects);
      },
      error: function () {
        console.log("ApiUtil#fetchProjects error");
      }
    });
  },

  fetchProjectTasks: function (projectId) {
    $.ajax({
      type: 'GET',
      url: 'api/tasks/project_tasks/' + projectId,
      dataType: 'json',
      success: function (tasks) {
        ApiActions.receiveAll(tasks);
      },
      error: function () {
        console.log("ApiUtil#fetchProjectTasks error");
      }
    });
  },

  register: function(userDetails, callback) {
    // create FormData object to transmit avatar url successfully
    var newUser = new FormData();
    newUser.append("user[name]", userDetails.name);
    newUser.append("user[email]", userDetails.email);
    newUser.append("user[password]", userDetails.password);
    if (userDetails.avatar) {
      newUser.append("user[avatar]", userDetails.avatar);
    }

    $.ajax({
      type: "POST",
      url: "/api/users",
      processData: false,
      contentType: false,
      dataType: "json",
      data: newUser,
      success: function(currentUser) {
       SessionActions.currentUserReceived(currentUser);
       callback && callback();
      }
    });
   },

  login: function(credentials, callback) {
    $.ajax({
      type: "POST",
      url: "/api/session",
      dataType: "json",
      data: credentials,
      success: function(currentUser) {
       SessionActions.currentUserReceived(currentUser);
       callback && callback();
      }
    });
   },

   logout: function() {
     $.ajax({
       type: "DELETE",
       url: "/api/session",
       dataType: "json",
       success: function() {
         SessionActions.logout();
       }
     });
   },

   fetchCurrentUser: function(completion) {
     $.ajax({
       type: "GET",
       url: "/api/session",
       dataType: "json",
       success: function(currentUser) {
         SessionActions.currentUserReceived(currentUser);
       },
       complete: function() {
         completion && completion();
       }
     });
   },

   fetchTeamUsers: function() {
     $.ajax({
       type: "GET",
       url: "/api/users",
       dataType: "json",
       success: function(teamUsers) {
         ApiActions.receiveAllTeamUsers(teamUsers);
       },
       error: function() {
         console.log("ApiUtil#fetchTeamUsers error");
       }
     });
   }


};

module.exports = ApiUtil;
