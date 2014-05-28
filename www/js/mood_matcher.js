 var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substringRegex;
     
        // an array that will be populated with substring matches
        matches = [];
     
        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');
     
        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            // the typeahead jQuery plugin expects suggestions to a
            // JavaScript object, refer to typeahead docs for more info
            matches.push({ value: str });
          }
        });
        cb(matches);
      };
    };
    // get mood states from server and populate type ahead choices.
    var mood_states = [];
    
    var server_mood_states = $.get( "http://localhost:4567/mood-states", function(resp) {
      console.log( "get mood_states" );
    })
    .fail(function(resp) {
      alert( "Error.  Call to http://localhost:4567/mood-states failed." );
    })
    
    server_mood_states.always(function(resp) {
      mood_states = JSON.parse(resp);
      console.log( "mood_states finished "+mood_states );
      $('#mood').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        name: 'mood_states',
        displayKey: 'value',
        source: substringMatcher(mood_states)
      });
    });
     
    