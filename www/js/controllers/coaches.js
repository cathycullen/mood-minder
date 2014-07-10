CoachesController = {
  load: function() {
    var request = $.ajax({
      type: "GET",
      url: window.apiURL + "all-coaches",
      dataType: "json",
      xhrFields: {
        withCredentials: true
      }
    });

    request.success(function(coaches) {
      window.allCoaches = coaches;
    });
  }
};
