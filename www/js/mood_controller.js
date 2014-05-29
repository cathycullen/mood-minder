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
        
        $(moodPage).find('#submit_mood').click(function(evt) {
          evt.preventDefault();
          
          $.get("http://localhost:4567/submit-mood", form_to_json(this.form), function() {
         })
          .done(function() {
            console.log( "submit-mood "+form_to_json(this.form) );
          })
          .fail(function() {
            alert( "error calling http://localhost:4567/submit-mood" );
          });
        });
        
        // get all mood_states from server and init
        initialized = true;
        console.log("moodController initialized");
      }
    }
   }
}();  

