ReportsController = {
  lastWeekReport: function() {
    return $.ajax({type: "GET",
                   url: window.apiURL + "mood-report-last-week",
                   data: {token: LocalSettings.getCurrentUserToken()}
                  });
  },
  lastMonthReport: function() {
    return $.ajax({type: "GET",
                   url: window.apiURL + "mood-report-last-month",
                   data: {token: LocalSettings.getCurrentUserToken()}
                  });
  },
  send: function() {
    return $.ajax({type: "GET",
                   url: window.apiURL + "send-weekly-mood-report",
                   data: {token: LocalSettings.getCurrentUserToken()}
                  });
  }
};

