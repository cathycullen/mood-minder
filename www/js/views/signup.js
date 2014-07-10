var SignupView = function() {
  this.template = $("#signup-template").html();
  this.el = $(this.template);

  this.el.submit(this.signupRequest.bind(this));
  this.el.find("#cancel").click(app.loginForm);
}

SignupView.prototype.render = function() {
  $("#content").html(this.el);
}

SignupView.prototype.signupRequest = function(e) {
  e.preventDefault();
  var request = SessionsController.signup(this.el.find("#email").val(),
                                          this.el.find("#password").val());

  request.done(function(user) {
    window.currentUser = user;
    app.postLogin();
  }.bind(this));

  request.fail(function(resp) {
    this.el.find(".status").text("Unable to register.");
  }.bind(this));
}

