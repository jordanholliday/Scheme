var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    TaskIndex = require('./components/task_index'),
    ApiUtil = require('./util/api_util'),
    NavBar = require('./components/nav_bar'),
    TaskDetail = require('./components/task_detail');

var App = React.createClass({
  render: function () {
    return (
      <div className="app">
        <NavBar />
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={TaskIndex} />

   <Route path="/tasks" component={TaskIndex} >
     <Route path="/tasks/:taskId" component={TaskDetail} />
   </Route>
  </Route>
);

$(document).on('ready', function () {
  ReactDOM.render(<Router>{routes}</Router>, $('.root')[0]);
});


