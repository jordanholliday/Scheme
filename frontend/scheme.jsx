var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    TaskIndex = require('./components/task_index'),
    ApiUtil = require('./util/api_util'),
    SessionStore = require('./stores/sessions'),
    App = require('./components/app'),
    TaskDetail = require('./components/task_detail'),
    LoginForm = require('./components/login_form'),
    RegistrationForm = require('./components/registration_form');

var routes = (
  <Route path="/" component={App}>
    <Route path="/tasks" component={TaskIndex} onEnter={_requireLogIn}>
      <Route path="/tasks/:taskId" component={TaskDetail} />
    </Route>

    <Route path="/login" component={LoginForm} />

    <Route path="/register" component={RegistrationForm} />

  </Route>
);

$(document).on('ready', function () {
  ReactDOM.render(<Router>{routes}</Router>, $('.root')[0]);
});

function _requireLogIn (nextState, replace, asyncCompletionCallback) {
  if (!SessionStore.currentUserHasBeenFetched()) {
    ApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  } else {
    _redirectIfNotLoggedIn();
  }

  function _redirectIfNotLoggedIn () {
    if (!SessionStore.isLoggedIn()) {
      replace('/login');
    }

    asyncCompletionCallback();
  }
}
