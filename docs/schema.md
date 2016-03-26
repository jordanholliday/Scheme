# Schema Information

## tasks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
description | text      |
deadline    | date      |
repeats     | string    | in: %w(daily weekdays weekly monthly)
parent_id   | integer   | foreign key (references tasks), indexed
assignee_id | integer   | not null, foreign key (references users), indexed
creator_id  | integer   | not null, foreign key (references users), indexed
project_id  | integer   | not null, foreign key (references projects), indexed
completed   | boolean   | not null, default: false

## projects
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
description | text      |
team_id     | integer   | not null, foreign key (references team), indexed
archived    | boolean   | not null, default: false

## teams
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## memberships
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
member_id   | integer   | not null, foreign key (references user), compound indexed with team_id
team_id     | integer   | not null, foreign key (references task), compound index with member_id

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text      | not null
author_id   | integer   | not null, foreign key (references user), indexed
task_id     | integer   | not null, foreign key (references task), indexed

## uploads
column name     | data type | details
----------------|-----------|-----------------------
id          | integer   | not null, primary key
filename    | string    | not null
url         | string    | not null
uploader_id | integer   | not null, foreign key (references user), indexed
task_id     | integer   | not null, foreign key (references task), indexed

## task_follows
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
follower_id | integer   | not null, foreign key (references user), indexed
task_id     | integer   | not null, foreign key (references task), indexed

## users
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
email       | string    | not null
name        |  string   | not null
avatar_url  |  string   |
password_digest    | string   | not null
session_token    | string   | not null

