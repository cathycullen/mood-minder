var DateFormatter = {
  short: function(d) {
    d = new Date(d);

    return this.date(d) + " " + this.time(d);
  },

  time: function(d) {
    var hours = d.getHours();
    var m = "am";
    if(hours > 12) {
      m = "pm";
      hours = Math.abs(hours - 12);
    }

    var minutes = d.getMinutes();
    if(minutes < 10) {
      minutes = "0" + minutes.toString();
    }

    return hours + ":" +
           minutes.toString() + " " + m;
  },

  date: function(d) {
    return (d.getMonth() + 1).toString() + "/" +
           d.getDate().toString() + "/" +
           d.getFullYear().toString();
  }
}
