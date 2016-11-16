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
