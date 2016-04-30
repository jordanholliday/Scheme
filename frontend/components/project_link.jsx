var React = require('react'),
    ReactDOM = require('react-dom'),
    TeamUserStore = require('../stores/team_users'),
    ProjectStore = require('../stores/projects.js'),
    ApiUtil = require('../util/api_util'),
    SchemeModal = require('./scheme_modal');

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

module.exports = ProjectLink;
