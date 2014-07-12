var LocalSettings = {
  db: window.localStorage,
  reminderScheduleKey: "reminderSchedule",

  setReminderSchedule: function(schedule) {
    this.db.setItem(this.reminderScheduleKey, JSON.stringify(schedule));
  },

  getReminderSchedule: function() {
    return new ReminderSchedule(JSON.parse(this.db.getItem(this.reminderScheduleKey)));
  }
};
