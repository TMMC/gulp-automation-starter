$(function() {
  // Inject navigation item for enabling theme preview
  $('#sg-masthead .navbar-nav').prepend('<li><a href="#" class="sg-theme-toggle" role="button">Enable theme preview</a></li>');
  // Enable or disable theme preview
  $('.sg-theme-toggle').on('click', function(e) {
    e.preventDefault();
    if ($('#bs-theme-sheet').length == 0) {
      $('head').append('<link rel="stylesheet" id="bs-theme-sheet" href="assets/css/theme.min.css" />').prop('disabled',false);
      $(this).text('Disable theme preview');
    } else {
      $('head #bs-theme-sheet').prop('disabled',true).remove();
      $(this).text('Enable theme preview');
    }
  });
});
