var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    ApiConstants = require('../constants/api_constants');

var _teamUsers = {};
var _teamName;
var _teamId;
var TeamUserStore = new Store(AppDispatcher);

TeamUserStore.findUser = function (userId) {
  return _teamUsers[userId];
};

TeamUserStore.all = function () {
  return _teamUsers;
};

TeamUserStore.teamName = function () {
  return _teamName;
};

TeamUserStore.teamId = function () {
  return _teamId;
};

var resetTeamUsers = function (receivedTeamUsers) {
  _teamUsers = {};
  _teamName = receivedTeamUsers.team_name;
  _teamId = receivedTeamUsers.team_id;
  for (var j = 0; j < receivedTeamUsers.users.length; j++) {
    var currentUser = receivedTeamUsers.users[j];
    _teamUsers[currentUser.id] = currentUser;
  }
};

TeamUserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ApiConstants.RECEIVE_ALL_TEAM_USERS:
      resetTeamUsers(payload.teamUsers);
      TeamUserStore.__emitChange();
      break;
  }
};

module.exports = TeamUserStore;

