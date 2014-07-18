var ReminderSchedule = function(options) {
  if(this.isValidSchedule(options)){
    this.startHour = options.startHour;
    this.startMinutes = options.startMinutes;
    this.endHour = options.endHour;
    this.endMinutes = options.endMinutes;
  } else {
    throw "Invalid reminder schedule properties";
  }
};

ReminderSchedule.prototype.isValidSchedule = function(options) {
  if(this.isValidHour(options.startHour) && this.isValidHour(options.endHour) &&
     options.startHour <= options.endHour &&
     this.isValidMinutes(options.startMinutes) && this.isValidMinutes(options.endMinutes)) {
    return true;
  } else {
    return false;
  }
};

ReminderSchedule.prototype.isValidHour = function(hour) {
  if(hour !== undefined && hour >= 0 && hour <= 23) {
    return true;
  } else {
    return false;
  }
};

ReminderSchedule.prototype.isValidMinutes = function(minutes) {
  if(minutes !== undefined && minutes >= 0 && minutes <= 59) {
    return true;
  } else {
    return false;
  }
};

ReminderSchedule.prototype.startHourIn12 = function() {
  if(this.startHour >= 12) {
    return this.startHour-12;
  } else {
    return this.startHour;
  }
};

ReminderSchedule.prototype.endHourIn12 = function() {
  if(this.endHour >= 12) {
    return this.endHour-12;
  } else {
    return this.endHour;
  }
};

ReminderSchedule.prototype.startTimeMeridiem = function() {
  if(this.startHour >= 12) {
    return "pm";
  } else {
    return "am";
  }
};

ReminderSchedule.prototype.endTimeMeridiem = function() {
  if(this.endHour >= 12) {
    return "pm";
  } else {
    return "am";
  }
};
