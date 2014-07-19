var ReportView = function() {
  this.template = _.template($('#report-view-template').html());
  this.tableTemplate = _.template($('#report-results-template').html());

  this.el = $(this.template({}));
  this.el.submit(this.sendReport.bind(this));

  this.el.find("#weekly").on('click',function(e){
    this.weeklyReport();
    console.log("A weekly report type was chosen");
  }.bind(this));

  this.el.find("#monthly").on('click',function(e){
    this.monthlyReport();
    console.log("A monthly report type was chosen");
  }.bind(this));
};

ReportView.prototype.render = function() {
  $("#content").html(this.el);
}

ReportView.prototype.sendReport = function(e) {
  e.preventDefault();
  var request = ReportsController.send();

  request.done(function(user) {
    this.el.find(".status").text("MoodMinder report has been sent.");
  }.bind(this));

  request.fail(function(resp) {
    this.el.find(".status").text("Unable to send MoodMinder report.");
  }.bind(this));
};

ReportView.prototype.weeklyReport = function() {
  var request = ReportsController.lastWeekReport();

  request.done(function(moods) {
    this.el.find("#send").removeAttr('disabled');
    this.el.find("#table-container").html(this.tableTemplate({moods: moods}));
  }.bind(this));

  request.fail(function(resp) {
    this.el.find(".status").text("Unable to load moods from server.");
  }.bind(this));
};

ReportView.prototype.monthlyReport = function() {
  var request = ReportsController.lastMonthReport();

  request.done(function(moods) {
    this.el.find("#send").removeAttr('disabled');
    this.el.find("#table-container").html(this.tableTemplate({moods: moods}));
  }.bind(this));

  request.fail(function(resp) {
    this.el.find(".status").text("Unable to load moods from server.");
  }.bind(this));
};
