var ReminderScheduleView = function() {
  this.template = _.template($("#reminder-schedule-template").html());

  this.el = $(this.template(LocalSettings.getReminderSchedule()));

  this.el.submit(this.setReminderSchedule.bind(this));
};

ReminderScheduleView.prototype.render = function() {
  window.plugin.notification.local.getScheduledIds(function(scheduledIds) {
    $("#content").html(this.el);
    // $("#content").append("<p>" + scheduledIds.length + " reminders scheduled");
  }.bind(this));
};


ReminderScheduleView.prototype.setReminderSchedule = function(e) {
  e.preventDefault();

  var start_hour = parseInt(this.el.find("#start_hour").val());
  var start_min = parseInt(this.el.find("#start_min").val());
  var start_am_pm = this.el.find("#start_am_pm").val();
  var end_hour = parseInt(this.el.find("#end_hour").val());
  var end_min = parseInt(this.el.find("#end_min").val());
  var end_am_pm = this.el.find("#end_am_pm").val();

  if (start_am_pm == "pm") {
   start_hour += 12;
  }
  if (end_am_pm == "pm") {
   end_hour += 12;
  }

  if(start_am_pm == "am" && start_hour == 12) {
    start_hour = 0;
  }

  if(end_am_pm == "am" && end_hour == 12) {
    end_hour = 0;
  }

  console.log ("Start time: "+start_hour+":"+start_min+ "   End Time: "+end_hour+ " "+end_min);
  var schedule = new ReminderSchedule({startHour: start_hour,
                                       startMinutes: start_min,
                                       endHour: end_hour,
                                       endMinutes: end_min});
  LocalSettings.setReminderSchedule(schedule);
  Reminders.setReminders(schedule);

  this.el.find(".status").text("Reminder schedule has been saved.");
};



