function DateFormatter = {

  shortFormat: function(d) {
    return parseInt(d.getUTCMonth())+1 +"/"+d.getUTCDay()+"/"+d.getUTCFullYear()+" "+d.getHours()+":"+d.getMinutes();
  }
}
