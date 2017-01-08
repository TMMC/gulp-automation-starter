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
