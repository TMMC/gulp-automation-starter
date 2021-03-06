// == Cookies handling function: createCookie
function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
  } else {
    var expires = "";
  }
  document.cookie = name + "=" + escape(value) + expires + "; path=/";
}

// == Cookies handling function: readCookie
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ')
    c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0)
      return unescape(c.substring(nameEQ.length, c.length));
  }
  return null;
}

// == Cookies handling function: eraseCookie
function eraseCookie(name) {
  createCookie(name, "", -10);
}
