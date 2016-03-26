# Flux Stores

### TaskStore

Holds all persisted task data.

##### Actions:
- `receiveAllTasks`
- `receiveSingleTask`
- `removeTask`

##### Listeners:
- `TasksIndex` (passes to `TaskIndexItem` via props)
- `TaskDetail` (passes to children via props)

### TaskEditorStore

Holds un-persisted task data to send to the API.

##### Actions:
- `receiveTaskEditorParams`

##### Listeners:
- `TaskIndexItem`
- `TaskDetail` (passes to children via props)

### ProjectStore

Holds all persisted project data.

##### Actions:
- `receiveAllProjects`
- `receiveSingleProject`
- `removeProject`

##### Listeners:
- `ProjectIndex`

### ProjectEditorStore

Holds un-persisted project data to send to the API.

##### Actions:
- `receiveProjectEditorParams`

##### Listeners:
- `ProjectModal`

### TaskSearchStore

Holds search parameters to send to the API.

##### Actions:
- `receiveTaskSearchParams`

##### Listeners:
- `TaskSearch`

### TaskSearchSuggestionStore

Holds typeahead suggestions for task search.

##### Actions:
- `receiveTaskSearchSuggestions`

##### Listeners:
- `TaskSearchSuggestions`

### UiStore

Holds hovered item id.

##### Actions:
- `receiveMouseEnter`
- `receiveMouseExit`
- `receiveClick`
- `removeClick`

##### Listeners:
- `TaskIndexItem`
- `NavBar`
- `ProjectIndex`
- `TaskSearch`
- other elements with non-CSSable hover/click states

