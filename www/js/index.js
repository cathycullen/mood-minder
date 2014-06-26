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
        app.receivedEvent('deviceready');
        window.server_url = "jma-mood-server.herokuapp.com/"
        window.server_url = "localhost:9393/"

        // get server mood states
        request = $.get( "http://localhost:9393/mood-states", function(resp) {
          console.log( "get mood-states" );
        })
        .fail(function(resp) {
          alert( "Error.  Call to "+window.server_url+"mood-states failed." );
        })
        request.success(function(resp) {
          window.server_mood_states = JSON.parse(resp);
          //alert(window.server_mood_states);
          console.log( "server_mood_states: "+window,server_mood_states);

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

         $.get("http://localhost:9393/logged-in",  function() {
            })
              .success(function(resp) {
                //alert("onDeviceReady called logged-in: "+resp);
                var myLogin = document.getElementById('login');
                console.log("myLogin "+myLogin);

                // what initial screen to show depends upon response
                if (resp == "false" )  {
                    document.getElementById('login').setAttribute('style', 'display:block');
                    document.getElementById('moodForm').setAttribute('style', 'display:none');
                }
                else {
                    document.getElementById('login').setAttribute('style', 'display:none');
                    document.getElementById('moodForm').setAttribute('style', 'display:block');
                }
              })
              .fail(function() {
                alert( "error calling "+window.server_url+"logged-in" );
              });    

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
 //       var parentElement = document.getElementById(id);
 //       var listeningElement = parentElement.querySelector('.listening');
  //      var receivedElement = parentElement.querySelector('.received');

//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        //alert("received event " +id);
    },

    /**
     * Determine whether the file loaded from PhoneGap or not
     */
    isPhoneGap: function() {
        return (window.cordova || window.PhoneGap || window.phonegap)
        && /^file:\/{3}[^\/]/i.test(window.location.href)
        && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
    },
    isRipple: function() {
      return window.tinyHippos;
    }

};
