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
    initialize: function() {
      this.bindEvents();
    },
    // Bind Event Listeners
    //
    bindEvents: function() {
      $(document).ready(function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        // NOTE: The following code appears to be buggy. Firing before Ripple
        // has a chance to load. Disabled for now. If you don't use Ripple at
        // all, then you can saftely uncomment the code once again.
        // If we aren't running in an emulator, fire onDeviceReady once the page
        // loads
        //if(!this.isPhoneGap() && !this.isRipple()) {
          //this.onDeviceReady();
        //}
      }.bind(this));
    },

    postLogin: function() {
      // Show the mood entry view
      var view = new MoodView();
      view.render();
    },

    editReminderSchedule: function() {
      var view = new ReminderScheduleView();
      view.render();
    },

    forgotPassword: function(e) {
      if(e) {
        e.preventDefault();
      }
      // Show the forgot password view
      var view = new ForgotPasswordView();
      view.render();
    },

    loginForm: function(e) {
      if(e) {
        e.preventDefault();
      }
      // Show the login view
      var view = new LoginView();
      view.render();
    },

    signup: function(e) {
      if(e) {
        e.preventDefault();
      }
      // Show the login view
      var view = new SignupView();
      view.render();
    },

    onDeviceReady: function() {
      var navBarView = new NavBarView();

      var request = SessionsController.determineLoggedInStatus();

      request.done(function(resp) {
        // This is hacky and will be replaced by local html5 local storage
        // goodness, so we don't depend on the server to tell us if we're logged
        // in or not
        SessionsController.loggedIn = true;
        this.postLogin();
      }.bind(this));

      request.fail(function() {
        SessionsController.loggedIn = false;
        this.loginForm();
      }.bind(this));
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
