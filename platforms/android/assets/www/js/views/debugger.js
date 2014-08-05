var DebuggerView = function() {
  this.template = _.template($("#debugger-template").html());
  //this.el.submit(this.loginRequest.bind(this));
};

DebuggerView.prototype.render = function() {
  window.plugin.notification.local.getScheduledIds(function(reminders) {
    var data = {reminders: reminders, logMessages: window.logMessages || []};
    $("#content").html(this.template(data));
  }.bind(this));
};
