// The following line removes all existing reminders
// and sets 8 reminders, between 8:15am and 9:30pm
//
// var schedule = new ReminderSchedule({startHour: 8, startMinutes: 15, endHour: 9+12, endMinutes: 30});
// Reminders.setReminders(schedule);


var Reminders = {
  REMINDER_COUNT: 8,
  MAX_SHIFT: 10,

  // Set REMINDER_COUNT between the start hour/minute & end hour/minute
  setReminders: function(schedule) {
    this.cancelReminders();

    var now = new Date();
    var start = new Date(now.getYear(), now.getMonth(), now.getDate(), schedule.startHour, schedule.startMinutes, 0, 0);
    var end = new Date(now.getYear(), now.getMonth(), now.getDate(), schedule.endHour, schedule.endMinutes, 0, 0);

    var reminderTimes = this.generateReminderTimes(start, end);

    for(var i=0; i < reminderTimes.length; i++) {
      var time = reminderTimes[i];
      window.plugin.notification.local.add({
        id:      "scheduled-" + i,
        title:   'Reminder',
        message: 'Time to record your mood. ' + i,
        repeat:  'daily',
        date:    time
      });
    }

    return reminderTimes;
  },

  cancelReminders: function() {
    window.plugin.notification.local.getScheduledIds(function(scheduledIds) {
      for(var i=0; scheduledIds.length > i; i++) {
        window.plugin.notification.local.cancel(scheduledIds[i]);
      }
    });
  },

  generateReminderTimes: function(start, end) {
    var reminderTimes = [];

    var evenMinutesBetweenReminders = Math.floor(((end - start) / 60000)/this.REMINDER_COUNT);

    // Pick reminder times from start to end, shifting between 0 and MAX_SHIFT minutes
    // to prevent exactly even intervals between reminders
    for(var i=0; i<this.REMINDER_COUNT; i++) {
      var randomShift = (Math.random() * this.MAX_SHIFT)*60*1000;
      // For the last reminder, shift sooner (negative), so we don't blow past the user's
      // desired end time
      if(i === this.REMINDER_COUNT-1) {
        randomShift = randomShift*-1;
      }

      var intervalShift = (i * evenMinutesBetweenReminders)*60*1000;
      var reminder = new Date(start.getTime() + intervalShift + randomShift);
      reminderTimes.push(reminder);
    }

    return reminderTimes;
  }
};

