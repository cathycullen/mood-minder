var ForgotPasswordView = function() {
  this.template = $("#forgot-password-template").html();
  this.el = $(this.template);

  this.el.submit(this.forgotPasswordRequest.bind(this));
  this.el.find("#cancel").click(app.loginForm);
}

ForgotPasswordView.prototype.render = function() {
  $("#content").html(this.el);
}

ForgotPasswordView.prototype.forgotPasswordRequest = function(e) {
  e.preventDefault();

  var email = this.el.find("#email").val();

  var request = SessionsController.requestPasswordReset(email);

  request.done(function(resp) {
    app.loginForm();
  }.bind(this));

  request.fail(function(resp) {
    this.el.find(".status").text("No user exists for that email address.");
  }.bind(this));
}
