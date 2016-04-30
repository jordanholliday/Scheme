var React = require('react'),
    ReactDOM = require('react-dom'),
    TeamUserStore = require('../stores/team_users'),
    ProjectStore = require('../stores/projects.js'),
    ApiUtil = require('../util/api_util'),
    SchemeModal = require('./scheme_modal'),
    ProjectLink = require('./project_link');

var ProjectDrawer = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      teammates: TeamUserStore.all(),
      teamName: TeamUserStore.teamName(),
      projects: ProjectStore.all(),
      showNewProjectModal: false
    }
  },

  componentDidMount: function () {
    this.teamUserStoreToken = TeamUserStore.addListener(this.updateTeammates);
    this.projectStoreToken = ProjectStore.addListener(this.updateProjects);
    ApiUtil.fetchTeamUsers();
  },

  componentWillUnmount: function () {
    this.teamUserStoreToken.remove();
    this.projectStoreToken.remove();
  },

  hideNewProjectModal: function () {
    this.setState({showNewProjectModal: false});
  },

  showNewProjectModal: function () {
    this.setState({showNewProjectModal: true});
  },

  validateNewProjectName: function (name) {
    return name.length > 0;
  },

  updateTeammates: function () {
    this.setState({
      teammates: TeamUserStore.all(),
      teamName: TeamUserStore.teamName()
    });
  },

  updateProjects: function () {
    this.setState({
      projects: ProjectStore.all(),
      showNewProjectModal: false
    });
  },

  createProject: function (input) {
    var teamId = TeamUserStore.teamId();
    ApiUtil.createProject({
      name: input,
      team_id: teamId
    })
  },

  renderNewProjectModal: function () {
    return (
      <SchemeModal
        showInviteModal={this.state.showNewProjectModal}
        modalHeader="New Project"
        hideInviteModal={this.hideNewProjectModal}
        inputLabel="Project Name"
        inputId="huh"
        inputPlaceholder="Get Rich or Die Trying"
        inputMicetype={"All members of " + this.state.teamName +" can view and edit this project."}
        inputSubmit={this.createProject}
        inputValidation={this.validateNewProjectName}
        submitButtonText="Create Project"
      />
    );
  },

  renderDrawerHeader: function () {
    return (
      <ul className="drawer-header group">
        <li className="drawer-logo"></li>
        <li className="close-drawer" onClick={this.props.hideProjectDrawer}>
          <svg viewBox="0 0 32 32"><polygon points="23.778,5.393 16,13.172 8.222,5.393 5.393,8.222 13.172,16 5.393,23.778 8.222,26.607 16,18.828 23.778,26.607 26.607,23.778 18.828,16 26.607,8.222"></polygon></svg>
        </li>
      </ul>
    );
  },

  renderTeammatesList: function () {
    var teamUserLis = [];
    $.each(this.state.teammates, function (teammate) {
      teamUserLis.push(<li key={this.id}>
        <img src={this.avatar_url}/>
      </li>);
    });

    return (
      <ul className="group teammate-list">
        {teamUserLis.slice(0,6)}
      </ul>
    );
  },

  renderProjectLinks: function () {
    var allProjects = [];
    this.state.projects.forEach(function (project) {
      allProjects.push(<ProjectLink
        project={project}
        key={project.id}
        selected={this.props.projectId === project.id}
      />);
    }.bind(this))

    return (
      <div className="project-list">

        <div className="group project-list-header">
          <h3>Projects</h3>
          <button onClick={this.showNewProjectModal}>
            <svg viewBox="0 0 32 32">
              <polygon points="28,14 18,14 18,4 14,4 14,14 4,14 4,18 14,18 14,28 18,28 18,18 28,18"></polygon>
            </svg>
          </button>
        </div>

        <ul className="project-links">
          {allProjects}
        </ul>

      </div>
    )
  },

  render: function () {
    return (
      <section className={"project-drawer"}>
        {this.renderDrawerHeader()}
        <h2>{this.state.teamName}</h2>
        {this.renderTeammatesList()}
        {this.renderProjectLinks()}
        {this.state.showNewProjectModal ? this.renderNewProjectModal() : null}
      </section>
    );
  }
});

module.exports = ProjectDrawer;
