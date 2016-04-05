var _weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var TaskUtil = {
  shortDeadline: function (taskDeadline) {
      var dateWithYear = new Date(Date.parse(taskDeadline)).toDateString().split(" ").slice(1);
      dateWithYear.pop();
      return dateWithYear.join(" ");
  },

  contextualDeadline: function (taskDeadline) {
    var dateWithYear;
    var deadlineDate = new Date(Date.parse(taskDeadline));
    if (deadlineDate.toDateString() === Date.today().toDateString()) {
      return "Today";
    }
    else if (deadlineDate.toDateString() === Date.today().add(1).day().toDateString()) {
      return "Tomorrow";
    }
    else if (deadlineDate.toDateString() === Date.today().add(-1).day().toDateString()) {
      return "Yesterday";
    }
    else if (Date.today() < deadlineDate && deadlineDate < Date.today().add(7).day()) {
      // return day of week if task is due in coming week
      return _weekdays[deadlineDate.getDay()];
    }
    else if (deadlineDate.getYear() === Date.today().getYear()) {
      // remove year if task is due this year
      dateWithYear = new Date(Date.parse(taskDeadline)).toDateString().split(" ").slice(1);
      dateWithYear.pop();
      return dateWithYear.join(" ");
    } else {
      // otherwise, return year
      dateWithYear = new Date(Date.parse(taskDeadline)).toDateString().split(" ").slice(1);
      return dateWithYear.join(" ");
    }
  },

  pastPresentOrFutureTask: function (taskDeadline) {
    // Returns 0 for deadline === today OR tomorrow, -1 for past deadlines
    // and 1 for tasks due beyond "tomorrow"
    var deadlineDateObj = new Date(Date.parse(taskDeadline));
    if (deadlineDateObj.toDateString() === Date.today().toDateString()) {
      return 0;
    }
    else if (deadlineDateObj.toDateString() === Date.today().add(1).day().toDateString()) {
      return 0;
    }
    else if (deadlineDateObj < Date.today()) {
      return -1;
    }
    else {
      return 1;
    }
  }
};

module.exports = TaskUtil;
