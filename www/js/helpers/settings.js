var LocalSettings = {
  db: window.localStorage,
  reminderScheduleKey: "reminderSchedule",
  userTokenKey: "userToken",

  setReminderSchedule: function(schedule) {
    this.db.setItem(this.reminderScheduleKey, JSON.stringify(schedule));
  },

  getReminderSchedule: function() {
    return new ReminderSchedule(JSON.parse(this.db.getItem(this.reminderScheduleKey)));
  },

  setCurrentUserToken: function(token) {
    this.db.setItem(this.userTokenKey, JSON.stringify(token));
  },

  getCurrentUserToken: function() {
    return JSON.parse(this.db.getItem(this.userTokenKey));
  },
};
