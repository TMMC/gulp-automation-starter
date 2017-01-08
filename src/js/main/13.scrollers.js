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
