var LoginView = function() {
  this.template = $("#login-template").html();
  this.el = $(this.template);

  this.el.submit(this.loginRequest.bind(this));

  this.el.find("#forgot-password").click(app.forgotPassword);
  this.el.find("#signup").click(app.signup);
};

LoginView.prototype.render = function() {
  $("#content").html(this.el);
};

LoginView.prototype.loginRequest = function(e) {
  e.preventDefault();
  var request = SessionsController.login(this.el.find("#email").val(),
                                         this.el.find("#password").val());

  request.done(function(user) {
    window.currentUser = user;
    app.postLogin();
  }.bind(this));

  request.fail(function(resp) {
    this.el.find(".status").text("Invalid Username or Password");
  }.bind(this));
};
