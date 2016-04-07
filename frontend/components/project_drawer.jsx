var React = require('react'),
    ReactDOM = require('react-dom'),
    TeamUserStore = require('../stores/team_users'),
    ProjectStore = require('../stores/projects.js'),
    ApiUtil = require('../util/api_util');

var ProjectDrawer = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      teammates: TeamUserStore.all(),
      teamName: TeamUserStore.teamName(),
      projects: ProjectStore.all()
    }
  },

  componentDidMount: function () {
    this.teamUserStoreToken = TeamUserStore.addListener(this.updateTeammates);
    this.projectStoreToken = ProjectStore.addListener(this.updateProjects);
    ApiUtil.fetchTeamUsers();
  },

  componentWillUnmount: function () {
    this.teamUserStoreToken.remove();
  },

  componentWillReceiveProps: function (newProps) {
    debugger
  },

  updateTeammates: function () {
    this.setState({
      teammates: TeamUserStore.all(),
      teamName: TeamUserStore.teamName()
    });
  },

  updateProjects: function () {
    this.setState({
      projects: ProjectStore.all()
    });
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
        {teamUserLis}
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
      <ul className="project-links">
        {allProjects}
      </ul>
    )
  },

  render: function () {
    return (
      <section className={"project-drawer"}>
        {this.renderDrawerHeader()}
        <h2>{this.state.teamName}</h2>
        {this.renderTeammatesList()}
        <h3>Projects</h3>
        {this.renderProjectLinks()}
      </section>
    );
  }
});


var ProjectLink = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },

  projectLink: function () {
    if (this.props.selected) {return}
    this.context.router.push("/projects/" + this.props.project.id);
  },

  className: function () {
    var className;
    if (this.props.selected){
      className = "selected";
    }

    return className;
  },

  render: function () {
    return (<li className={this.className()} onClick={this.projectLink}>
      {this.props.project.name}
    </li>
    )
  }
})

module.exports = ProjectDrawer;
