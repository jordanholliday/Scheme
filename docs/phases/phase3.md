# Phase 3: Projects and Teams (3 days)

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
* users/new.html.erb -> Add "Create New Team" field(s)

## Flux
### Views (React Components)
* `ProjectIndex`
  * `ProjectIndexItem`
  * `ProjectEditor`
* `MemberInvite`

### Stores
* ProjectStore
* ProjectEditorStore

### Actions
* ApiActions.receiveAllProjects
* ApiActions.receiveSingleProject -> triggered by ApiUtil
* ApiActions.deleteProject
* ApiActions.receiveAllMemberships
* ApiActions.receiveSingleMembership
* ApiActions.deleteMembership
* ProjectActions.fetchSingleProject -> triggers ApiUtil
* ProjectActions.createProject
* ProjectActions.editProject
* ProjectActions.destroyProject
* MembershipActions.createMembership
* MembershipActions.destroyMembership
* MembershipActions.fetchAllMemberships

### ApiUtil
* ApiUtil.fetchAllProjects
* ApiUtil.fetchSingleProject
* ApiUtil.createProject
* ApiUtil.editProject
* ApiUtil.destroyProject
* ApiUtil.createMembership
* ApiUtil.destroyMembership
* ApiUtil.createTeam

## Gems/Libraries
