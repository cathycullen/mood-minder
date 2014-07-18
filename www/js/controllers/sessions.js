SessionsController = {
  loggedIn: false,

  login: function(email, password) {
    return $.ajax({type: "GET",
                   url: window.apiURL + "submit-login",
                   data: {email: email, password: password},
                   dataType: "json"
                  });
  },

  isLoggedIn: function() {
    return this.loggedIn;
  },

  determineLoggedInStatus: function() {
    return $.ajax({type: "GET",
                   url: window.apiURL + "logged-in",
                   data: {token: LocalSettings.getCurrentUserToken()},
                  });
  },

  requestPasswordReset: function(email) {
    return $.ajax({type: "GET",
                   url: window.apiURL + "forgot-password",
                   data: {email: email}
                  });
  },

  signup: function(name, email, password, coach, role) {
    return $.ajax({type: "GET",
                   url: window.apiURL + "create-new-user",
                   data: {name: name, email: email, password: password, coach: coach, role: role}
                  });
  }
};
