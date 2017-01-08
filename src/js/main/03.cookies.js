// == Cookies info
var cookiesStat = readCookie('cookiesPermission');
if (cookiesStat == '1' || cookiesStat == '0') {
  $("#cookies-info").not(".hidden").addClass('hidden');
}

// == Hide cookies info
$("#cookies-info").on('click', 'a', function(e) {
  e.preventDefault();
  if ($(this).hasClass('icon-close')) {//don't show till the end of session
    createCookie('cookiesPermission', '1', '');
  } else {//don't show at all
    createCookie('cookiesPermission', '0', '365');
  }
  $("#cookies-info").slideUp(100);
});
