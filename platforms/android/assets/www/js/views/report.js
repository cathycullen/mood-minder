var ReportView = function() {
  this.template = _.template($('#report-view-template').html());
  this.tableTemplate = _.template($('#report-results-template').html());

  this.el = $(this.template({}));
  this.el.submit(this.sendReport.bind(this));

  this.el.find("#weekly").on('click',function(e){
    this.weeklyReport();
  }.bind(this));

  this.el.find("#monthly").on('click',function(e){
    this.monthlyReport();
  }.bind(this));
};

ReportView.prototype.render = function() {
  $("#content").html(this.el);
}

ReportView.prototype.sendReport = function(e) {
  e.preventDefault();
  var request = ReportsController.send();
  this.el.find("#send").attr('disabled', '');

  request.done(function(user) {
    this.el.find(".status").text("Report has been sent.");
  }.bind(this));

  request.fail(function(resp) {
    this.el.find(".status").text("Unable to send report.");
  }.bind(this));

  request.always(function() {
    this.el.find("#send").removeAttr('disabled');
  }.bind(this));
};

ReportView.prototype.weeklyReport = function() {
  var request = ReportsController.lastWeekReport();

  request.done(function(moods) {
    this.el.find("#send").removeAttr('disabled');
    this.el.find("#report-container").html(this.tableTemplate({moods: moods}));
  }.bind(this));

  request.fail(function(resp) {
    this.el.find(".status").text("Unable to load moods.");
  }.bind(this));
};

ReportView.prototype.monthlyReport = function() {
  var request = ReportsController.lastMonthReport();

  request.done(function(moods) {
    this.el.find("#send").removeAttr('disabled');
    this.el.find("#report-container").html(this.tableTemplate({moods: moods}));
  }.bind(this));

  request.fail(function(resp) {
    this.el.find(".status").text("Unable to load moods.");
  }.bind(this));
};

