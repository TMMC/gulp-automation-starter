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
