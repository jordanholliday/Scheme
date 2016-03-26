# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Teams
- `GET /api/teams/:id/projects`
  - Index of all projects & tasks for team
- `POST /api/teams`
- `GET /api/teams/:id/projects`
  - See team details, if I get to that
- `PATCH /api/teams/:id`
  - Edit team details, if I get to that
- `DELETE /api/teams/:id`
  - Delete team, if I get to that

### Members
- `GET /api/followers`
  - includes query param for typeahead suggestions, if I get to that
- `POST /api/teams/:team_id/members`:
  - Add member to team by id
  - If member doesn't exist, they will be invited to create account
- `DELETE /api/teams/:team_id/member/:member_id`:
  - Remove member from team by id

### Projects
- `GET /api/projects/:id`
  - index of all tasks for project
- `POST /api/projects`
- `PATCH /api/projects/:id`
- `DELETE /api/projects/:id`

### Tasks
- `GET /api/tasks`
  - For searching & displaying all tasks available to user
- `POST /api/tasks`
- `GET /api/tasks/:id`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Comments
- A tasks's comments are shown on the task show template
- `POST /api/tasks/:task_id/comments`:
  - Add comment to task
- `DELETE /api/comments/:comment_id`:
  - Remove comment from task

### Uploads
- Uploads (attached files) are shown on task show template
- `POST /api/tasks/:task_id/uploads`:
  - Add upload to task
- `DELETE /api/uploads/:upload_id
  - Remove upload from task

### Followers
- Task Followers are shown on task show template
- `GET /api/followers`
  - includes query param for typeahead suggestions, if I get to that
- `POST /api/tasks/:task_id/followers`:
  - Add follower to task by id
  - If follower doesn't exist, they will be invited to create account, if I get to that
- `DELETE /api/tasks/:task_id/follower/:follower_id`:
  - Remove follower from task by id
