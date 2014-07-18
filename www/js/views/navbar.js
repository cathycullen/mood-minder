var NavBarView = function() {
  this.el = $("nav");
  this.template = _.template($("#nav-template").html());

  this.el.on("click", "#reminder-schedule", function(e) {
    e.preventDefault();
    this.el.find(".navbar-collapse").collapse('hide');

    app.editReminderSchedule();
  }.bind(this));

  this.el.on("click", "#mood", function(e) {
    e.preventDefault();
    this.el.find(".navbar-collapse").collapse('hide');

    app.postLogin();
  }.bind(this));

  this.el.on("click", "#login", function(e) {
    e.preventDefault();
    this.el.find(".navbar-collapse").collapse('hide');

    app.loginForm();
  }.bind(this));

  this.el.on("click", "#forgot-password", function(e) {
    e.preventDefault();
    this.el.find(".navbar-collapse").collapse('hide');

    app.forgotPassword();
  }.bind(this));

  this.el.on("click", "#signup", function(e) {
    e.preventDefault();
    this.el.find(".navbar-collapse").collapse('hide');

    app.signup();
  }.bind(this));

  this.el.on("click", "#report", function(e) {
    e.preventDefault();
    this.el.find(".navbar-collapse").collapse('hide');

    app.report();
  }.bind(this));
};

NavBarView.prototype.render = function() {
  $("nav").html(this.template({loggedIn: SessionsController.isLoggedIn()}));
};
