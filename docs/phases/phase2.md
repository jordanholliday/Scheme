# Phase 2: Flux Architecture and Task CRUD (2 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* TasksIndex
  - TasksIndexItem
  - `TaskDetail`
    * `TaskSummary`

### Stores
* TaskStore
* TaskEditorStore

### Actions
* ApiActions.receiveAllTasks -> triggered by ApiUtil
* ApiActions.receiveSingleTask
* ApiActions.deleteTask
* TaskActions.fetchAllTasks-> triggers ApiUtil
* TaskActions.fetchSingleTask
* TaskActions.createTask
* TaskActions.editTask
* TaskActions.destroyTask

### ApiUtil
* ApiUtil.fetchAllTasks
* ApiUtil.fetchSingleTask
* ApiUtil.createTask
* ApiUtil.editTask
* ApiUtil.destroyTask

## Gems/Libraries
* Flux Dispatcher (npm)
