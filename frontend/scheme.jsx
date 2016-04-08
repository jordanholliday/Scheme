var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory,
    TaskIndex = require('./components/task_index'),
    ApiUtil = require('./util/api_util'),
    SessionStore = require('./stores/sessions'),
    App = require('./components/app'),
    TaskDetail = require('./components/task_detail'),
    LoginForm = require('./components/login_form'),
    RegistrationForm = require('./components/registration_form'),
    SplashPage = require('./components/splash_page'),
    ProjectDetail = require('./components/project_detail');

var routes = (
  <Route path="/" component={App}>

    <IndexRoute component={SplashPage} />

    <Route path="/projects/:projectId" component={ProjectDetail} onEnter={_requireLogIn}>
      <Route path="/projects/:projectId/:taskId" component={TaskDetail} />
    </Route>

    <Route path="/login" component={LoginForm} onEnter={_requireLogOut} />

    <Route path="/register" component={RegistrationForm} onEnter={_requireLogOut} />

  </Route>
);

var oldTaskRoutes = (
  <Route path="/tasks" component={TaskIndex} onEnter={_requireLogIn}>
    <Route path="/tasks/:taskId" component={TaskDetail} />
  </Route>
);

$(document).on('ready', function () {
  ReactDOM.render(<Router history={hashHistory}>{routes}</Router>, $('.root')[0]);
});

function _checkSessionStore (redirectCallback) {
  if (!SessionStore.currentUserHasBeenFetched()) {
    ApiUtil.fetchCurrentUser(redirectCallback);
  } else {
    redirectCallback();
  }
}

function _requireLogIn (nextState, replace, asyncCompletionCallback) {
  _checkSessionStore(_redirectIfNotLoggedIn);

  function _redirectIfNotLoggedIn () {
    if (!SessionStore.isLoggedIn()) {
      replace('/login');
    }

    asyncCompletionCallback();
  }
}

function _requireLogOut (nextState, replace, asyncCompletionCallback) {
  _checkSessionStore(_redirectIfLoggedIn);

  function _redirectIfLoggedIn () {
    if (SessionStore.isLoggedIn()) {
      replace('/projects/0');
    }

    asyncCompletionCallback();
  }
}



