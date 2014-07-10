var NavBarView = function() {
  this.el = $("nav");

  this.el.find("#reminder-schedule").click(function(e) {
    e.preventDefault();
    this.el.find(".navbar-collapse").collapse('hide');

    app.editReminderSchedule();
  }.bind(this));
}
