# Phase 3: Projects and Teams (2 days)

## Rails
### Models
* Project
* Team
* Member

### Controllers
* Api::TeamsController (create)
* Api::ProjectsController (create, index, show, update, destroy)
* Api::MembershipsController (create, destroy)

### Views
* projects/index.json.jbuilder
* projects/show.json.jbuilder

## Flux
### Views (React Components)
* `ProjectIndex`
  * `ProjectIndexItem`
  * `Project Editor`

### Stores
* ProjectStore
* ProjectEditorStore

### Actions
* ApiActions.receiveAllProjects -> triggered by ApiUtil
* ApiActions.receiveSingleProject
* ApiActions.deleteProject
* ProjectActions.fetchAllProjects -> triggers ApiUtil
* ProjectActions.fetchSingleProject
* ProjectActions.createProject
* ProjectActions.editProject
* ProjectActions.destroyProject

### ApiUtil
* ApiUtil.fetchAllProjects
* ApiUtil.fetchSingleProject
* ApiUtil.createProject
* ApiUtil.editProject
* ApiUtil.destroyProject

## Gems/Libraries
