/*! main.js • 2016-11-16 */
$(function() {

  // == Basic variables
  var root              = $('html'),
      body              = $('body'),
      locationHref      = $(location).attr('href'),
      locationHost      = $(location).attr('host'),
      locationHostname  = $(location).attr('hostname'),
      locationPort      = $(location).attr('port');

  // == Replace html "no-js" class with "js"
  root.removeClass("no-js").addClass("js");

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

  // == Back to the top link.
  $('#page-scroller').hide();
  var scrollOffset = Math.round($(window).height() / 4);
  var scrollClickEnabled = true;
  $(window).on("resize", function() {
    scrollOffset = Math.round($(window).height() / 4);
  });
  $(window).scroll(function() {
    if ($(this).scrollTop() >= scrollOffset) {
      $('#page-scroller:hidden').stop(true, true).fadeIn().blur();
    } else {
      $('#page-scroller').stop(true, true).fadeOut(200, function() {
        $(this).blur();
      });
    }
  });
  $('#page-scroller').on('click', function(e) {
    e.preventDefault();
    if (scrollClickEnabled) {
      scrollClickEnabled = false;
      $("html, body").animate({
        scrollTop : 0
      }, 300, function() {
        scrollClickEnabled = true;
      });
    }
  });

  // == Initiate Bootstrap tooltip
  $('[data-toggle="tooltip"]').tooltip();
  // == Initiate Bootstrap popover
  $('[data-toggle="popover"]').popover();

});