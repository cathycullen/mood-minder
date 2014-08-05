var OfflineView = function() {
  this.template = $("#offline-template").html();
  this.el = $(this.template);
  this.el.find("#reconnect").click(this.reconnect.bind(this));
};

OfflineView.prototype.render = function() {
  $("nav").hide();
  $("#content").html(this.el);
};

OfflineView.prototype.reconnect = function(e) {
  e.preventDefault();
  this.el.find("#reconnect").attr('disabled', '');

  var request = $.get(window.apiURL + "ping");

  request.done(function(e) {
    app.online();
  });

  request.always(function(e) {
    this.el.find("#reconnect").removeAttr('disabled');
  }.bind(this));
};
