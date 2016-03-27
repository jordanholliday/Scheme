# View Wireframes

## New User
![new-user]

## New Session
![new-session]

## ProjectIndex / TaskIndex / NavBar
![project_index]

## TaskDetail / TaskComment / TaskUpload / TaskCommentForm / TaskFollow
![task_detail]

## InboxIndex
![inbox]

[new-user]: ./wireframes/new_user.png
[new-session]: ./wireframes/new_session.png
[project_index]: ./wireframes/project_index.png
[task_detail]: ./wireframes/task_detail.png
[inbox]: ./wireframes/inbox.png

## Component Hierarchy

* `App`
  * `NavBar`
    * `TaskSearch`
    * `MemberInvite`
  * `ProjectIndex`
    * `ProjectIndexItem`
    * `ProjectEditor`
  * `TaskIndex`
    * `TaskIndexItem`
      * `TaskDetail`
        * `TaskSummary`
        * `SubTaskIndex`
          * `SubTask`
        * `TaskCommentIndex`
          * `TaskComment`
        * `TaskUploadIndex`
          * `TaskUpload`
        * `TaskCommentForm`
        * `TaskFollowerIndex`
          * `TaskFollower`
  * `InboxIndex`
    * `InboxItem`

