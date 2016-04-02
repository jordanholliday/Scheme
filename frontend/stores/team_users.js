var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    ApiConstants = require('../constants/api_constants');

var _users = {};
var TeamUserStore = new Store(AppDispatcher);

TeamUserStore.findUser = function (userId) {
  return _users[id];
};



