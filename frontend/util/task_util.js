var _weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var TaskUtil = {
  shortDeadline: function (taskDeadline) {
      var dateWithYear = new Date(Date.parse(taskDeadline)).toDateString().split(" ").slice(1);
      dateWithYear.pop();
      return dateWithYear.join(" ");
  },

  // returns yesterday, today, tomorrow, Thursday (ie, this Thursday) etc.
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
  }
};

module.exports = TaskUtil;
