CoachesController = {
  load: function() {
    var request = $.ajax({
      type: "GET",
      url: window.apiURL + "all-coaches",
      dataType: "json",
      data: {token: LocalSettings.getCurrentUserToken()}
    });

    request.done(function(coaches) {
      window.allCoaches = coaches;
    });

    return request;
  }
};
