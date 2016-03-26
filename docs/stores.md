# Flux Stores

### NoteStore

Holds all persisted note data.

##### Actions:
- `receiveAllNotes`
- `receiveSingleNote`
- `removeNote`

##### Listeners:
- `NotesIndex` (passes to `NoteIndexItem` via props)
- `NoteDetail`

### NoteFormStore

Holds un-persisted note data to send to the API.

##### Actions:
- `receiveNoteFormParams`

##### Listeners:
- `NoteForm`

### NotebookStore

Holds all persisted notebook data.

##### Actions:
- `receiveAllNotebooks`
- `receiveSingleNotebook`
- `removeNotebook`

##### Listeners:
- `NotebookIndex`

### NotebookFormStore

Holds un-persisted notebook data to send to the API.

##### Actions:
- `receiveNotebookFormParams`

##### Listeners:
- `NotebookForm`

### SearchStore

Holds search parameters to send to the API.

##### Actions:
- `receiveSearchParams`

##### Listeners:
- `SearchIndex`

### SearchSuggestionStore

Holds typeahead suggestions for search.

##### Actions:
- `receiveSearchSuggestions`

##### Listeners:
- `SearchSuggestions`
