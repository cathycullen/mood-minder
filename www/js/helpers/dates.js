var DateFormatter = {
  short: function(d) {
    d = new Date(d);

    return d.toLocaleDateString() + " " +
           d.toLocaleTimeString();
  }
}
