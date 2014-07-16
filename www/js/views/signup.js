var SignupView = function() {
  this.header = $('#signup-header-template').html();
  this.footer = $('#signup-footer-template').html();


  var append_str="";
  for(var i=0; i< window.allCoaches.length; i++)
  {
    append_str += "<option value='" + window.allCoaches[i].name + "'>" + window.allCoaches[i].name +"</option>";
  }  
  append_str += "</p></div>";
  this.template = this.header +append_str + this.footer;
  this.el = $(this.template);

  this.el.submit(this.signupRequest.bind(this));
  this.el.find("#cancel").click(app.loginForm);
};

SignupView.prototype.render = function() {
  $("#content").html(this.el);
};

SignupView.prototype.signupRequest = function(e) {
  e.preventDefault();
  var request = SessionsController.signup(this.el.find("#name").val(),
                                          this.el.find("#email").val(),
                                          this.el.find("#password").val(),
                                          this.el.find("#coach").val(),
                                          "client");

  request.done(function(user) {
    window.currentUser = user;
    app.loginForm();
  }.bind(this));

  request.fail(function(resp) {
    this.el.find(".status").text("Unable to register.");
  }.bind(this));
};
