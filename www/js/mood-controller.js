moodController = function() {
  var moodPage;
  var initialized = false;
  
  function errorLogger(errorCode, errorMessage) {
    console.log('Error: '+errorCode + ':'+ errorMessage);
  }
  
  return {
    init: function(page) {
      if (!initialized) {
       
         
        moodPage = page;
        
         $(moodPage).find('#submitMood').click(function(evt) {
          evt.preventDefault();
          // do something.  serialize and submit to server
        });
        
        
        // get all mood_states from server and init
        initialized = true;
      }
    }
   }
}();  

