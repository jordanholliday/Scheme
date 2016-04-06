var React = require('react'),
    ReactDOM = require('react-dom'),
    ProjectStore = require('../stores/projects'),
    ApiUtil = require('../util/api_util'),
    ProjectStore = require('../stores/projects'),
    NavBar = require('./nav_bar'),
    TaskIndex = require('./task_index');

var ProjectDetail = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },

  projectId: function () {
    return this.props.params.projectId;
  },

  getInitialState: function () {
    // get projectId from route (router required above)

    return {project: ProjectStore.findProject(this.projectId())}
  },

  componentDidMount: function () {
    this.projectStoreToken =ProjectStore.addListener(this.getProject);
    ApiUtil.fetchProjects();
  },

  componentWillUnmount: function () {
    this.projectStoreToken.remove();
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({project: ProjectStore.findProject(newProps.params.projectId)})
  },

  getProject: function () {
    this.setState({project: ProjectStore.findProject(this.projectId())})
  },

  render: function () {
    return (
      <div className="app">
        <NavBar />
        <section className="project-detail">

          <div className="task-wrapper">
            <TaskIndex project={this.state.project ? this.state.project : null} />
            {this.props.children}
          </div>

        </section>
      </div>
    );
  }
});

module.exports = ProjectDetail;
