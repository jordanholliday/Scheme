var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    ApiConstants = require('../constants/api_constants');

var _teamUsers = {};
var TeamUserStore = new Store(AppDispatcher);

TeamUserStore.findUser = function (userId) {
  return _teamUsers[id];
};

TeamUserStore.all = function () {
  return _teamUsers;
};

var resetTeamUsers = function (receivedTeamUsers) {
  _teamUsers = {};
  for (var j = 0; j < receivedTeamUsers.length; j++) {
    var currentUser = receivedTeamUsers[j];
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

