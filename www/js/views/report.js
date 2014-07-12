var ReportView = function() {
	this.template = $('#report-template').html();
	this.el = $(this.template);
  this.el.submit(this.sendReport.bind(this));

  //this.el.find("#weekly").click(this.weeklyReport);

  this.el.find("#weekly").on('click',function(e){
  	app.weeklyReport();
  	console.log("A weekly eport type was chosen");
	});

	this.el.find("#weekly2").on('click',function(e){
  	app.weeklyReport();
  	console.log("A weekly eport type was chosen");
	});

	this.el.find("#monthly").on('click',function(e){
  	app.monthlyReport();
  	console.log("A monthly eport type was chosen");
	});

	this.el.find("#monthly2").on('click',function(e){
  	app.monthlyReport();
  	console.log("A monthly eport type was chosen");
	});
};

ReportView.prototype.render = function() {
	$("#content").html(this.el);
}

ReportView.prototype.sendReport = function(e) {
  e.preventDefault();
  this.weeklyReport();
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

	request.done(function(resp) {
	  this.el.find(".status").text("Last Week Report Succeeded");
	}.bind(this));

	request.fail(function(resp) {
	  this.el.find(".status").text("Last week Report Failed.");
	}.bind(this));
};

