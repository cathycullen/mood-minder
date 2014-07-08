/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function(page) {
        moodPage = page;
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        // If we aren't running in an emulator, fire onDeviceReady once the page
        // loads
        if(!this.isPhoneGap() && !this.isRipple()) {
          $(document).ready(this.onDeviceReady);
        }
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      // The following line removes all existing reminders
      // and sets 8 reminders, between 8:15am and 9:30pm
      //Reminders.setReminders(8, 15, 9+12, 30);

      window.server_url = "jma-mood-server.herokuapp.com/";
      window.server_url = "localhost:9393/";

      // get server mood states
      var moodRequest = $.get( "http://localhost:9393/mood-states", function(resp) {
        console.log( "get mood-states" );
      })
      .fail(function(resp) {
        alert( "Error.  Call to "+window.server_url+"mood-states failed." );
      });
      moodRequest.success(function(resp) {
        window.server_mood_states = JSON.parse(resp);
        //alert(window.server_mood_states);
        console.log( "server_mood_states: "+window.server_mood_states);

        $(document).ready(function() {
          // init typeahead functionality with server_mood_states
          $('#mood').typeahead({
                                  hint: true,
                                  highlight: true,
                                  minLength: 1
                                },
                                {
                                  name: 'mood_states',
                                  displayKey: 'value',
                                  source: substringMatcher(window.server_mood_states)
                                });
        });
      });


      var coachesRequest = $.ajax({
        type: "GET",
        url: "http://localhost:9393/all-coaches",
        xhrFields: {
          withCredentials: true
        }
      });

      coachesRequest.success(function(resp) {
        window.all_coaches = JSON.parse(resp);
        alert(window.all_coaches);
        console.log( "all_coaches: "+window.all_coaches);
      });

      coachesRequest.fail(function() {
        alert( "error calling "+window.server_url+"all-coaches" );
      });

      var loggedInRequest = $.ajax({
        type: "GET",
        url: "http://localhost:9393/logged-in",
        xhrFields: {
          withCredentials: true
        }
      });

      loggedInRequest.done(function(resp) {
        $('submit_login').width($('email').width());
        //xx = document.getElementById('email').getAttribute('width');
        //yy = document.getElementById('submit_login').getAttribute('width');

        // what initial screen to show depends upon response
        if (resp == "false" )  {
          $("#login").show();
          $("#moodForm").hide();
        }
        else {
          $("#login").hide();
          $("#moodForm").show();
        }
      });

      loggedInRequest.fail(function() {
        alert( "error calling "+window.server_url+"logged-in" );
      });
    },

    /**
     * Determine whether the file loaded from PhoneGap or not
     */
    isPhoneGap: function() {
        return (window.cordova || window.PhoneGap || window.phonegap) &&
          /^file:\/{3}[^\/]/i.test(window.location.href) &&
          /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
    },
    isRipple: function() {
      return window.tinyHippos;
    }
};
