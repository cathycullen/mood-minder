var LocalSettings = {
  db: window.localStorage,
  reminderScheduleKey: "reminderSchedule",
  userTokenKey: "userToken",

  setReminderSchedule: function(schedule) {
    this.db.setItem(this.reminderScheduleKey, JSON.stringify(schedule));
  },

  getReminderSchedule: function() {
    var schedule = this.db.getItem(this.reminderScheduleKey);
    if(schedule) {
      return new ReminderSchedule(JSON.parse(schedule));
    } else {
      return ReminderSchedule.defaultSchedule();
    }
  },

  setCurrentUserToken: function(token) {
    this.db.setItem(this.userTokenKey, JSON.stringify(token));
  },

  getCurrentUserToken: function() {
    return JSON.parse(this.db.getItem(this.userTokenKey));
  },
};
