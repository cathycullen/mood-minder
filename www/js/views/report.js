var ReportView = function() {
	//this.template = $('#report-template').html();
	//this.el = $(this.template);

  this.header = $('#report-header-template').html();
  this.footer = $('#report-footer-template').html();
	this.template = this.header +this.footer;
	this.el = $(this.template);
  this.el.submit(this.sendReport.bind(this));

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

	  var append_str="";
	  mood = JSON.parse(resp);
	  for(var i=0; i< mood.length; i++)
	  {
	  	d = new Date(mood[i].created_at);
	  	s = parseInt(d.getUTCMonth())+1 +"/"+d.getUTCDay()+"/"+d.getUTCFullYear()+" "+d.getHours()+":"+d.getMinutes();
	    append_str += "<tr><td>" + s + "</td>";
	    append_str += "<td>" + mood[i].mood + "</td>";
	    append_str += "<td>" + mood[i].internal_external + "</td>";
	    append_str += "<td>" + mood[i].thoughts + "</td>";
	    append_str += "<td>" + mood[i].energy_level + "</td></tr>";
	  } 
	  this.template = this.header +append_str + this.footer;
	  this.el = $(this.template);
		$("#content").html(this.el);
	  // call render

	}.bind(this));

	request.fail(function(resp) {
	  this.el.find(".status").text("Last week Report Failed.");
	}.bind(this));
};

ReportView.prototype.monthlyReport = function() {

	var request = ReportsController.lastMonthReport();

	request.done(function(mood) {

	  this.el.find(".status").text("Last Month Report Succeeded");
	  var append_str="";
	  mood = JSON.parse(resp);
	  for(var i=0; i< mood.length; i++)
	  {
	  	d = new Date(mood[i].created_at);
	  	s = parseInt(d.getUTCMonth())+1 +"/"+d.getUTCDay()+"/"+d.getUTCFullYear()+" "+d.getHours()+":"+d.getMinutes();
	    append_str += "<tr><td>" + s + "</td>";
	    append_str += "<td>" + mood[i].mood + "</td>";
	    append_str += "<td>" + mood[i].internal_external + "</td>";
	    append_str += "<td>" + mood[i].thoughts + "</td>";
	    append_str += "<td>" + mood[i].energy_level + "</td></tr>";
	  } 
	  this.template = this.header +append_str + this.footer;
	  this.el = $(this.template);
		$("#content").html(this.el);
	}.bind(this));

	request.fail(function(resp) {
	  this.el.find(".status").text("Last month Report Failed.");
	}.bind(this));
};

