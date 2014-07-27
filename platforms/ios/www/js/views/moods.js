var MoodView = function() {
  this.template = $("#mood-template").html();
  this.el = $(this.template);

  this.el.submit(this.saveMood.bind(this));
  this.el.find("#enter-another").on('click', this.showForm.bind(this));
};

MoodView.prototype.render = function() {
  // We can't display the form until we have mood states loaded
  // locally
  var deferred;

  if(window.moodStates === undefined || window.moodStates === null ) {
    deferred = MoodStatesController.loadStates();
  } else {
    deferred = jQuery.Deferred();
    // since we don't need to make a request to load moods (they're already
    // present locally), resolve this deferred right away
    deferred.resolve();
  }

  deferred.done(function(moodStates) {
    if(moodStates) {
      window.moodStates = moodStates;
    }

    var moodStateStrings = window.moodStates.map(function(s) { return s.state; });

    // init typeahead functionality with server_mood_states
    this.el.find('#mood').typeahead({hint: true,
                          highlight: true,
                          minLength: 1
                         },
                         {name: 'mood_states',
                          displayKey: 'value',
                          source: this.substringMatcher(moodStateStrings),
                          templates: {
                            suggestion: function(d) {
                              return '<p class="needsclick">' + d.value + '</p>';
                            }
                          }
                         });

    $("#content").html(this.el);
  }.bind(this));
};

MoodView.prototype.showForm = function(e) {
  e.preventDefault();
  this.el.find("form")[0].reset();

  this.el.find("#complete").hide();
  this.el.find("form").show();
};

MoodView.prototype.saveMood = function(e) {
  e.preventDefault();

  this.el.find("button[type='submit']").attr('disabled', '');

  var request = MoodsController.save(this.el.find("#mood").val(),
                                     this.el.find("#origin").val(),
                                     this.el.find("#energy-level").val(),
                                     this.el.find("#thoughts").val());
  request.done(function(resp) {
    this.el.find("form")[0].reset();

    this.el.find("form").hide();
    this.el.find("#complete").show();
  }.bind(this));

  request.fail(function(resp) {
    this.el.find(".status").text("Unable to save your mood. Please try again.");
  }.bind(this));

  request.always(function() {
    this.el.find("button[type='submit']").removeAttr('disabled');
  }.bind(this));
};

MoodView.prototype.substringMatcher = function(strs) {
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
