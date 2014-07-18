CoachesController = {
  load: function() {
    var request = $.ajax({
      type: "GET",
      url: window.apiURL + "all-coaches",
      dataType: "json",
      data: {token: LocalSettings.getCurrentUserToken()}
    });

    request.success(function(coaches) {
      window.allCoaches = coaches;
    });
  }
};
