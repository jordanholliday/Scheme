var React = require('react'),
    ReactDOM = require('react-dom');

var ProjectDrawer = React.createClass({

  renderDrawerHeader: function () {
    return (
      <ul className="group">
        <li className="drawer-logo"></li>
        <li className="close-drawer" onClick={this.props.hideProjectDrawer}>
          <svg viewBox="0 0 32 32"><polygon points="23.778,5.393 16,13.172 8.222,5.393 5.393,8.222 13.172,16 5.393,23.778 8.222,26.607 16,18.828 23.778,26.607 26.607,23.778 18.828,16 26.607,8.222"></polygon></svg>
        </li>
      </ul>
    );
  },

  render: function () {
    return (
      <section className="project-drawer">
        {this.renderDrawerHeader()}
      </section>
    );
  }
});

module.exports = ProjectDrawer;
