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
        showProjectDrawer: false
      }
  },

  componentWillMount: function () {
    ApiUtil.fetchProjects();
  },

  componentDidMount: function () {
    this.projectStoreToken=ProjectStore.addListener(this.getProjectOrRedirect);
  },

  componentWillUnmount: function () {
    this.projectStoreToken.remove();
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({project: ProjectStore.findProject(newProps.params.projectId)})
  },

  getProjectOrRedirect: function () {
    // if params.projectId doesn't corresnpond to existing project,
    // re-route to first project in store. Need to replace with proper 404
    var paramsProject = ProjectStore.findProject(this.projectId())
    if (paramsProject) {
      this.setState({project: ProjectStore.findProject(this.projectId())})
    } else {
      this.context.router.push("/projects/" + ProjectStore.all()[0].id);
    }
  },

  showProjectDrawer: function () {
    this.setState({showProjectDrawer: true});
  },

  hideProjectDrawer: function () {
    this.setState({showProjectDrawer: false});
  },

  renderProjectDrawer: function () {
    if (this.state.showProjectDrawer){
      return [<ProjectDrawer
        ref="projectDrawer"
        key="project-drawer"
        projectId={this.state.project ? this.state.project.id : null}
        hideProjectDrawer={this.hideProjectDrawer} />];
    } else {
      return [];
    }
  },


  render: function () {
    return (
      <div className="app">

        <ReactCSSTransitionGroup transitionName="drawer-transition" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
           {this.renderProjectDrawer()}
        </ReactCSSTransitionGroup>

        <div className="non-drawer-content">
         <NavBar showProjectDrawer={this.showProjectDrawer} showHamburger={!this.state.showProjectDrawer} />
           <section className="project-detail">
           <div className="task-wrapper">
             <TaskIndex
              project={this.state.project ? this.state.project : null}
              projectId={this.props.params.projectId} />
             {this.props.children}
           </div>
         </section>
        </div>

      </div>
    );
  }
});

module.exports = ProjectDetail;
