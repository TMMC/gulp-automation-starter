/*! main.js • 2017-1-26 */
$(function() {

// == Basic variables
var win               = $(window),
    doc               = $(document),
    root              = $('html'),
    body              = $('body'),
    navbarHeight      = 76,  // Navbar height on desktop
    navbarBreakPoint  = 992, // Bootstrap var grid-float-breakpoint = screen-md = 992px (or grid-float-breakpoint-max = screen-md - 1)
    locationHref      = $(location).attr('href'),
    locationPathname  = $(location).attr('pathname'),
    locationHost      = $(location).attr('host'),
    locationHostname  = $(location).attr('hostname'),
    locationPort      = $(location).attr('port'),
    locationQuery     = $(location).attr('search');

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

// == One Page Nav
// $('#nav-main').onePageNav({
//   currentClass: 'active',
//   changeHash: false,
//   filter: ':not([target="_blank"])',
//   scrollSpeed: 900
// });

// == One Page nav for Bootstrap
// Smooth scroll
$(function() {
  $('#nav-main a[href*=#]:not([href=#]):not([target=_blank])').on('click', function (e) {
    if (locationPathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && locationHostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 900);
        e.preventDefault();
      }
    }
  });
});
// Clicking closes responsive navbar
function close_toggle() {
  if (win.width() <= navbarBreakPoint) {
    $('#masthead a').on('click', function () {
      $('.navbar-collapse').collapse('hide');
    });
  } else {
    $('#masthead a').off('click');
  }
};
close_toggle();
win.resize(close_toggle);

// == Back to the top link.
$('#page-scroller').hide();
var scrollOffset = Math.round(win.height() / 4);
var scrollClickEnabled = true;
win.on("resize", function() {
  scrollOffset = Math.round(win.height() / 4);
});
win.scroll(function() {
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

// Simpler (not multiple clicks proof)
// win.scroll(function (e) {
//     if (win.scrollTop() >= 250) {
//         $("#page-scroller").addClass("show");
//     } else {
//         $("#page-scroller").removeClass("show");
//     }
// });
// $('a[href="#masthead"]').on('click', function (e) {
//     $('html, body').animate({scrollTop: 0}, 'slow');
//     e.preventDefault();
// });

// == Initiate Bootstrap tooltip
$('[data-toggle="tooltip"]').tooltip();

// == Initiate Bootstrap popover
$('[data-toggle="popover"]').popover();

// == Initiate Bootstrap modal
// $('#modal-multipurpose').on('show.bs.modal', function (event) {
//   var mTrigger = $(event.relatedTarget),   // Link that triggered the modal.
//       mContent = mTrigger.data('content'), // Extract info from data-* attributes.
//       modal = $(this),                     // Assign modal to variable.
//       modalClose = '<button type="button" class="close" data-dismiss="modal" aria-label="Zamknij" title="Zamknij"> <span aria-hidden="true">×</span></button>';
//   // Update content of the modal.
//   modal.find('.modal-body').html($(mContent)).prepend(modalClose);
// });

// == Initiate Bootstrap scrollspy (body needs `position: relative`)
body.scrollspy({
  offset: navbarHeight,
  target: '#masthead'
});

// == Smooth scrollers links in content
$('.scroller').on('click', function (e) {
    var target = $(this.hash);
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 1000);
    e.preventDefault();
});

// == Scroll/animate to error status
win.on('load', function() {
  var pos = null;
  if ($("#status-alert").length > 0) {
    pos = $('#status-alert').offset().top;

    if (pos != null) {
      $("html,body").animate({
        scrollTop: pos
      }, 500);
    }
  }
});

// == Animated header
win.scroll(function () {
  if (doc.scrollTop() >= navbarHeight) {
    // Class may change to 'navbar-sticky' or any 'navbar-<dest>'
    $(".navbar-animated").removeClass("navbar-transparent"); // or addClass
  } else {
    $(".navbar-animated").addClass("navbar-transparent");   // or removeClass
  }
});

// Website specific actions
// --------------------------------------------------


});