SessionsController = {
  loggedIn: false,
  login: function(email, password) {
    return $.ajax({type: "GET",
                   url: window.apiURL + "submit-login",
                   xhrFields: {
                     withCredentials: true
                   },
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
                   xhrFields: {
                     withCredentials: true
                   }
                  });
  },

  requestPasswordReset: function(email) {
    return $.ajax({type: "GET",
                   url: window.apiURL + "forgot-password",
                   xhrFields: {
                     withCredentials: true
                   },
                   data: {email: email}
                  });
  },

  signup: function(email, password) {
    return $.ajax({type: "GET",
                   url: window.apiURL + "create-new-user",
                   xhrFields: {
                     withCredentials: true
                   },
                   data: {email: email, password: password}
                  });
  }
}
