
var clientId = '308195013302-jqtpvnrk1c9nclna9vunqds5oh15ffpn.apps.googleusercontent.com'; //choose web app client Id, redirect URI and Javascript origin set to http://localhost
var apiKey = 'AIzaSyAsUWy8XW8zGdH9OLwBicQhnwPf8BeN5yI'; //choose public apiKey, any IP allowed (leave blank the allowed IP boxes in Google Dev Console)
var userEmail = "rcm0i6ta52jlqf69d30a6mshsgocprmr@import.calendar.google.com"; //your calendar Id
var userTimeZone = "America/Chicago"; //example "Rome" "Los_Angeles" ecc...
var maxRows = 3; //events to shown
var calName = "Events"; //name of calendar (write what you want, doesn't matter)

var scopes = 'https://www.googleapis.com/auth/calendar';

//--------------------- Add a 0 to numbers
function padNum(num) {
  if (num <= 9) {
    return "0" + num;
  }
  return num;
}
//--------------------- end

//--------------------- From 24h to Am/Pm
function AmPm(num) {
  if (num <= 12) { return num; }
  return padNum(num - 12);
}

function getAmPm(num) {
  if (num <= 12) { return "am"; }
  return "pm";
}

//--------------------- end

//--------------------- num Month to String
function monthString(num) {
  if (num === "01") { return "Jan"; }
  else if (num === "02") { return "Feb"; }
  else if (num === "03") { return "Mar"; }
  else if (num === "04") { return "Apr"; }
  else if (num === "05") { return "May"; }
  else if (num === "06") { return "Jun"; }
  else if (num === "07") { return "Jul"; }
  else if (num === "08") { return "Aug"; }
  else if (num === "09") { return "Sep"; }
  else if (num === "10") { return "Oct"; }
  else if (num === "11") { return "Nov"; }
  else if (num === "12") { return "Dec"; }
}
//--------------------- end

//--------------------- from num to day of week
function dayString(num){
  if (num == "1") { return "Mon" }
  else if (num == "2") { return "Tue" }
  else if (num == "3") { return "Wed" }
  else if (num == "4") { return "Thu" }
  else if (num == "5") { return "Fri" }
  else if (num == "6") { return "Sat" }
  else if (num == "0") { return "Sun" }
}
//--------------------- end

//--------------------- client CALL
function handleClientLoad(max) {
  if (max) maxRows = max
  gapi.client.setApiKey(apiKey);
  checkAuth();
}
//--------------------- end

//--------------------- check Auth
function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}
//--------------------- end

//--------------------- handle result and make CALL
function handleAuthResult(authResult) {
  if (authResult) {
    makeApiCall();
  }
}
//--------------------- end

//--------------------- API CALL itself
function makeApiCall() {
  var today = new Date(); //today date
  gapi.client.load('calendar', 'v3', function () {
    var request = gapi.client.calendar.events.list({
      'calendarId' : userEmail,
      'timeZone' : userTimeZone,
      'singleEvents': true,
      'timeMin': today.toISOString(), //gathers only events not happened yet
      'maxResults': maxRows,
      'orderBy': 'startTime',
      'SameSite': 'None',
      'Secure': true});
    request.execute(function (resp) {
      for (var i = 0; i < resp.items.length; i++) {
        var li = document.createElement('li');
        var item = resp.items[i];
        console.log(item)
        var classes = ['event-list'];
        var allDay = item.start.date? true : false;
        var startDT = allDay ? item.start.date : item.start.dateTime;
        var dateTime = startDT.split("T"); //split date from time
        var date = dateTime[0].split("-"); //split yyyy mm dd
        var startYear = date[0];
        var startMonth = monthString(date[1]);
        var startDay = date[2];
        var startDateISO = new Date(startMonth + " " + startDay + ", " + startYear + " 00:00:00");
        var startDayWeek = dayString(startDateISO.getDay());
        var str = [
          startDayWeek, ' ',
          startMonth, ' ',
          startDay, ' ',
          startYear, ' ', item.summary, ' @ ', item.location
        ];
        li.innerHTML = str.join('');
        li.setAttribute('class', classes.join(' '));
        document.getElementById('events').appendChild(li);
      }
      // document.getElementById('updated').innerHTML = "updated " + today;
      document.getElementById('calendar').innerHTML = calName;
    });
  });
}
