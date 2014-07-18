var NavBarView = function() {
  this.el = $("nav");
  this.template = _.template($("#nav-template").html());

  this.el.find("#reminder-schedule").click(function(e) {
    e.preventDefault();
    this.el.find(".navbar-collapse").collapse('hide');

    app.editReminderSchedule();
  }.bind(this));

  this.el.find('#mood').click(function(e)  {
    e.preventDefault();
    this.el.find(".navbar-collapse").collapse('hide');

    app.postLogin();
  }.bind(this));

  this.el.find('#login').click(function(e)  {
    e.preventDefault();
    this.el.find(".navbar-collapse").collapse('hide');

    app.loginForm();
  }.bind(this));

   this.el.find('#forgot-password').click(function(e)  {
    e.preventDefault();
    this.el.find(".navbar-collapse").collapse('hide');

    app.forgotPassword();
  }.bind(this));

   this.el.find('#signup').click(function(e)  {
    e.preventDefault();
    this.el.find(".navbar-collapse").collapse('hide');

    app.signup();
  }.bind(this));

   this.el.find('#report').click(function(e)  {
    e.preventDefault();
    this.el.find(".navbar-collapse").collapse('hide');

    app.report();
  }.bind(this));
};

NavBarView.prototype.render = function() {
  $("nav").html(this.template({loggedIn: SessionsController.isLoggedIn()}));
};
