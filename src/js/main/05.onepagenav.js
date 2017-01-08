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
