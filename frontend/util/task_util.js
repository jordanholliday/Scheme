var TaskUtil = {
  shortDeadline: function (taskDeadline) {
      var dateWithYear = new Date(Date.parse(this.state.deadline)).toDateString().split(" ").slice(1);
      dateWithYear.pop();
      return dateWithYear.join(" ");
  }
};

module.exports = TaskUtil;
