# Scheme
Scheme is a clone of Asana, the popular project management app. Scheme was made with Ruby on Rails and React.js.

*Interested in using Scheme? Please see the [FAQ](#faq).*

### Screenshots
##### Registration Page
![registration_page]
##### Task Detail
![task_detail]
##### Project Drawer
![project_drawer]
##### Invite Modal
![invite_modal]

[registration_page]: ./docs/screenshots/registration_page.png
[task_detail]: ./docs/screenshots/task_detail.png
[project_drawer]: ./docs/screenshots/project_drawer.png
[invite_modal]: ./docs/screenshots/invite_modal.png

### Technical Details
Scheme users can prioritize tasks by dragging and dropping them into the desired order.

Task order is maintained in a linked-list data structure. Each task knows the IDs of its `next` and `previous` tasks, and every project knows its `last_task_id`. To assemble the tasks in the correct order and avoid n+1 queries, Scheme retrieves an unordered group of tasks within a project, hashes them by ID, and then references the `next_task_id`s to create an array of tasks in the user’s designated order.

```javascript
var sortTasks = function (tasksObj, lastTaskId) {
  // start by inserting last task into ordered array
  var taskArr = [tasksObj[lastTaskId]];
  // then insert the previous task, until !previous_task_id
  while (taskArr[0].previous_task_id) {
    taskArr.unshift(tasksObj[taskArr[0].previous_task_id]);
  }

  return taskArr;
};
```

Thanks to the linked-list structure, re-ordering tasks within a project is an O(1) time operation, and requires updating only 3-5 task records, no matter how many tasks a project includes.

### Features
* Add / delete / complete tasks
* Assign tasks and set deadlines
* Create projects to organize tasks
* Invite other users to join your "team"
* Drag-n-drop ordering of tasks
* Drag-n-drop uploading of profile pictures
* Comment on tasks
* See new tasks and comments from other users in realtime

### Technologies Used
* React.js
* Flux
* Ruby on Rails
* JSON API
* PostgreSQL
* Pusher
* Sendgrid
* Heroku

[Original Design Docs](./README_v0.md)

### FAQ <a id="faq"></a>
Because I receive a lot of emails about Scheme, I'm adding a FAQ.

##### Can I use the code in this repo?
Yes. You don't need to pay me or attribute anything to me. Scheme is distributed under the [MIT License](./license).

##### Will you help me deploy or modify Scheme?
Yes, but only under contract. Be forewarned that, because freelance work is not my main focus, it will be expensive. Inquire at [jordanholliday@gmail.com](mailto:jordanholliday@gmail.com).

##### Are you going to add new features to Scheme?
Not unless someone hires me to do so.



