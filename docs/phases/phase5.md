# Phase 5: Follow Tasks and Inbox (1 day)

## Rails
### Models
* TaskFollow

### Controllers
* Api::TaskFollowsController (create, destroy)

### Views

## Flux
### Views (React Components)
* `TaskFollowerIndex`
  * `TaskFollower`
* `InboxIndex`
  * `InboxItem`

### Stores
* Task
* Inbox

### Actions
* ApiActions.receiveSingleTask (reuse)

### ApiUtil
* ApiUtil.createTaskFollower
* ApiUtil.destroyTaskFollower
* ApiUtil.fetchAllInboxItems
* ApiUtil.fetchMoreInboxItems

## Gems/Libraries
