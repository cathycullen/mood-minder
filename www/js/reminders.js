var Reminders = {
  REMINDER_COUNT: 50,
  MAX_SHIFT: 10,

  // Set REMINDER_COUNT between the start hour/minute & end hour/minute
  setReminders: function(startHour, startMinutes, endHour, endMinutes) {
    this.cancelReminders();

    var now = new Date();
    var start = new Date(now.getYear(), now.getMonth(), now.getDate(), startHour, startMinutes, 0, 0);
    var end = new Date(now.getYear(), now.getMonth(), now.getDate(), endHour, endMinutes, 0, 0);

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
    window.plugin.notification.local.cancelAll();
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

