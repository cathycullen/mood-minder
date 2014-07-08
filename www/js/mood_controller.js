var moodController = function() {
  var moodPage;
  var initialized = false;

  function errorLogger(errorCode, errorMessage) {
    console.log('Error: '+errorCode + ':'+ errorMessage);
  }

  function form_to_json (selector) {
    var ary = $(selector).serializeArray();
    var obj = {};
    for (var a = 0; a < ary.length; a++) obj[ary[a].name] = ary[a].value;
    return obj;
  }

  function get_cookie(cookie) {
    return document.cookie.split(';').reduce(function(prev, c) {
        var arr = c.split('=');
        return (arr[0].trim() === cookie) ? arr[1] : prev;
    }, undefined);
  }

  return {
    initialize: function(page) {
      if (!initialized) {

        moodPage = page;

        //initialize click event on submit login button, which will serialize form data and submit to server

        $(moodPage).find('#submit_login').click(function(evt) {
            var loginRequest = $.ajax({
            type: "GET",
             url: "http://localhost:9393/submit-login",
              xhrFields: {
                withCredentials: true
              },
              data: form_to_json(this.form)
             });

            loginRequest.success(function(resp) { 
              console.log("currentUser resp: "+resp);
              if(resp.length > 0) {
                var currentUser = JSON.parse(resp);
                $("#user-data").text(currentUser.id);
                window.currentUser = currentUser;
                //alert("login: submit-login: currentUser: "+window.currentUser);
                console.log( "submit-login done resp: " + resp+ "window.currentUser: "+window.currentUser.id);
                document.getElementById('login').setAttribute('style', 'display:none');
                document.getElementById('moodForm').setAttribute('style', 'display:block');
                showElement($('#moodForm'));
              } else {
                $("#user-data").text("Invalid Username or Password");
              }
            });

          loginRequest.fail(function() {
            alert( "error calling submit-login" );
          });

          loginRequest.done(function() {
            console.log( "done calling submit-login" );
          });
        });


        $('#forgot_password').click(function(evt) {
          console.log("forgot_password");
          $("#login").hide();
          $("#moodForm").hide();
          $("#forgotPasswordForm").show();
          $("#newUserForm").hide();
        });

        $('#create_login').click(function(evt) {
          console.log("create_login");
          $("#login").hide();
          $("#moodForm").hide();
          $("#forgotPasswordForm").hide();
          $("#newUserForm").show();
          document.getElementById('newUserForm').setAttribute('style', 'display:block');
        }); 
        $('#cancel_forgot_password').click(function(evt) {
          console.log("forgot_password");
          $("#login").show();
          $("#moodForm").hide();
          $("#forgotPasswordForm").hide();
          $("#newUserForm").hide();
        });

        // user has hit submit after entering email for forgotten password
        $('#submit_forgot_password').click(function(evt) {
            evt.preventDefault();
            console.log("submit forgot password called")
            var submitPassworRequest = $.ajax({type: "GET",
                                  url: "http://localhost:9393/forgot-password",
                                  xhrFields: {
                                    withCredentials: true
                                  },
                                  data: form_to_json(this.form)
                                 });
            submitPassworRequest.done(function(resp) {
                document.getElementById('forgotPassword').setAttribute('style', 'display:none');
                document.getElementById('login').setAttribute('style', 'display:block');
            });

            submitPassworRequest.fail(function() {
              alert( "error calling "+window.server_url+"forgot-password" );
            });
          });

        // user has hit submit after entering new user info
        $('#submit_new_user').click(function(evt) {
            evt.preventDefault();
            var createNewUserRequest = $.ajax({type: "GET",
                                  url: "http://localhost:9393/create-new-user",
                                  xhrFields: {
                                    withCredentials: true
                                  },
                                  data: form_to_json(this.form)
                                 });
            createNewUserRequest.done(function(resp) {
                document.getElementById('newUser').setAttribute('style', 'display:none');
                document.getElementById('login').setAttribute('style', 'display:block');
            });

            createNewUserRequest.fail(function() {
              alert( "error calling "+window.server_url+"create-new-user" );
            });
          });

          // add events to display new user form and forgot password form
          $(moodPage).find('#submit_mood').click(function(evt) {
            evt.preventDefault();
            $.get("http://localhost:9393/submit-mood", form_to_json(this.form), function() {
            })
            .done(function() {
              console.log( "submit-mood "+form_to_json(this.form) );
            })
            .fail(function() { alert( window.server_url+"/submit-mood" );
          });
        });
        initialized = true;
        console.log("moodController initialized");
      }
    }
   }
}();
