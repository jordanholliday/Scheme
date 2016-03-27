# Scheme

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Scheme is a project management web app inspired by Asana, and built on Rails with React/Flux. Scheme users ("schemers") can:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create accounts
- [ ] Join organizations
- [ ] Create tasks and subtasks
- [ ] Assign tasks, set deadlines, add comments
- [ ] Organize tasks into projects
- [ ] Attach files to tasks
- [ ] Mark tasks complete

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: Task Model, API, and React Components (2 days)

**Objective:** CRUD API for Tasks, plus React components and Flux cycle for
creating and updating tasks.

- [ ] create `Task` model & DB seeds
- [ ] CRUD API for notes (`TasksController`)
- [ ] jBuilder views for tasks
- [ ] setup `APIUtil` to interact with the API
- [ ] Add primary React components for Tasks:
  - [ ] `TasksIndex`
  - [ ] `TasksIndexItem`
  - [ ] `TaskDetail`
  - [ ] `TaskSummary`

### Phase 3: Projects and Teams (3 days)

**Objective:** Users can create projects and invite other users to their team.
All tasks belong to a project, all users belong to a team.

- [ ] Implement project components, building out the flux loop as needed.
  - [ ] `ProjectIndex`
  - [ ] `ProjectIndexItem`
  - [ ] `ProjectEditor`
- [ ] Add "new team" option to account creation process
- [ ] Add `NavBar` component and `MemberInvite` subcomponent, build out flux
loop as needed


### Phase 4: Task Comments and Uploads (2 days)

**Objective:** Allow users to add comments, subtasks, and files to tasks

- [ ] Implement components and extend Flux loop as needed
  - [ ] `TaskCommentIndex`
  - [ ] `TaskComment`
  - [ ] `TaskUploadIndex`
  - [ ] `TaskUpload`
  - [ ] `SubTaskIndex`
  - [ ] `SubTask`
- [ ] Enable drag-n-drop file uploads & storage (AWS?)
- [ ] add basic colors & styles

### Phase 5: TaskFollows and Inbox (1 day)

**Objective:** Allow users to follow tasks and see recent activity on their tasks
in "Inbox" mode

- [ ] Add TaskFollower components
  - [ ] `TaskFollowerIndex`
  - [ ] `TaskFollower`
- [ ] Add Inbox components and routes
  - [ ] `InboxIndex`
  - [ ] `InboxItem`
- Use CSS to style Inbox view

### Phase 8: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Search tasks
- [ ] Multiple sessions
- [ ] Drag-n-drop organization of tasks
- [ ] Animated unicorns to celebrate task completion
- [ ] Pagination / infinite for Inbox and TaskIndex
- [ ] Keyboard shortcuts for power users
- [ ] Push new task comments from other users
- [ ] Paid account upgrades

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
