var ReminderScheduleView = function() {
 this.template = $("#reminder-schedule-template").html();
 this.el = $(this.template);
};

ReminderScheduleView.prototype.render = function() {
  $("#content").html(this.el);
};
