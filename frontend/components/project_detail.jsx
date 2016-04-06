var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactCSSTransitionGroup = require('react-addons-css-transition-group'),
    ProjectStore = require('../stores/projects'),
    ApiUtil = require('../util/api_util'),
    ProjectStore = require('../stores/projects'),
    NavBar = require('./nav_bar'),
    TaskIndex = require('./task_index'),
    ProjectDrawer = require('./project_drawer');

var ProjectDetail = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },

  projectId: function () {
    return this.props.params.projectId;
  },

  getInitialState: function () {
    // get projectId from route (router required above)

    return {
        project: ProjectStore.findProject(this.projectId()),
        showProjectDrawer: true
      }
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

  toggleProjectDrawer: function () {
    this.setState({showProjectDrawer: !this.state.showProjectDrawer});
  },

  showProjectDrawer: function () {
    this.setState({showProjectDrawer: true});
  },

  renderProjectDrawer: function () {
    if (this.state.showProjectDrawer){
      return [<ProjectDrawer ref="projectDrawer" key="project-drawer" />];
    } else {
      return [];
    }
  },


  render: function () {
    return (
      <div className="app">

        <ReactCSSTransitionGroup transitionName="drawer-transition" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
           {this.renderProjectDrawer()}
        </ReactCSSTransitionGroup>

        <div className="non-drawer-content">
         <NavBar openDrawer={this.showProjectDrawer} />
           <section className="project-detail">
           <div className="task-wrapper">
             <TaskIndex project={this.state.project ? this.state.project : null} />
             {this.props.children}
           </div>
         </section>
        </div>

      </div>
    );
  }
});

module.exports = ProjectDetail;
