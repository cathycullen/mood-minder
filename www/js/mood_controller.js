moodController = function() {
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
  
  return {
    initialize: function(page) {
      if (!initialized) {
       
        moodPage = page;
        //initialize click event on submit button, which will serialize form data and submit to server
        
        $(moodPage).find('#submit_login').click(function(evt) {
          evt.preventDefault();
          
          $.get("http://localhost:9393/submit-login", form_to_json(this.form), function() {
         })
          .success(function(resp) {
            window.currentUser = JSON.parse(resp);
            var currentUser = JSON.parse(resp);
            console.log( "submit-login done resp: " + resp+ "currentUser: "+currentUser.id);
            document.cookie = "user_id="+window.currentUser.id;
          })
          .fail(function() {
            alert( "error calling http://localhost:9393/submit-login" );
          });
        });

        var request = $.ajax({
                        url: "http://localhost:9393/currentUser",
                        method: "GET",
                        dataType: "JSON"
                      });

         request.fail(function() {
          alert( "error calling http://localhost:9393/currentUser" );
        })
         request.success(function(resp) {
          window.currentUser = resp;
          console.log('request.success called');
          if(window.currentUser.id) {
            $("#moodForm").show();
          } else {
            $("#login").show();
          }
        });


        $(moodPage).find('#submit_mood').click(function(evt) {
          evt.preventDefault();
          
          $.get("http://localhost:9393/submit-mood", form_to_json(this.form), function() {
         })
          .done(function() {
            console.log( "submit-mood "+form_to_json(this.form) );
          })
          .fail(function() {
            alert( "error calling http://localhost:9393/submit-mood" );
          });
        });
        
        // get all mood_states from server and init
        initialized = true;
        console.log("moodController initialized");
      }
    }
   }
}();  

