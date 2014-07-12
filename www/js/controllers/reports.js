ReportsController = {
  lastWeekReport: function() {
    return $.ajax({type: "GET",
                   url: window.apiURL + "mood-report-last-week",
                   xhrFields: {
                     withCredentials: true
                   }
                  });
  },
  lastMonthReport: function() {
    return $.ajax({type: "GET",
                   url: window.apiURL + "mood-report-last-month",
                   xhrFields: {
                     withCredentials: true
                   }
                  });
  },
  send: function() {
    return $.ajax({type: "GET",
                   url: window.apiURL + "send-weekly-mood-report",
                   xhrFields: {
                     withCredentials: true
                   }
                  });
  }
};

