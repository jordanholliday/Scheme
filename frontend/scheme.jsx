var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    TaskIndex = require('./components/task_index'),
    ApiUtil = require('./util/api_util'),
    App = require('./components/app'),
    TaskDetail = require('./components/task_detail');

var routes = (
  <Route path="/" component={App}>
    <Route path="/tasks" component={TaskIndex} onEnter={_requireLogIn}>
      <Route path="/tasks/:taskId" component={TaskDetail} />
    </Route>
  </Route>
);

$(document).on('ready', function () {
  ReactDOM.render(<Router>{routes}</Router>, $('.root')[0]);
});

var _requireLogIn = function (nextState, replace, asyncCompletionCallback) {
  if (!SessionStore.currentUserHasBeenFetched()) {
    ApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  } else {
    _redirectIfNotLoggedIn();
  }

  var _redirectIfNotLoggedIn = function () {
    if (!SessionStore.isLoggedIn()) {
      replace('/login');
    }

    asyncCompletionCallback();
  }
}
