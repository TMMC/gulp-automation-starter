/*! Google Maps Api *//*! Google Maps Api */
var iwContent =
  "<div class=\"gmaps-iw-title\">Company name</div>" +
  "<div class=\"gmaps-iw-addr\">street, postal code, city, country</div>" +
  "<div class=\"gmaps-iw-phone\"><i aria-hidden=\"true\" class=\"icon icon-fw icon-phone\"></i> xx xxx xx xx</div>" +
  "<div class=\"gmaps-iw-phone\"><i aria-hidden=\"true\" class=\"icon icon-fw glyphicon-phone\"></i> +xx xxx xxx xxx</div>" +
  "<div class=\"gmaps-iw-email\"><i aria-hidden=\"true\" class=\"icon icon-fw icon-envelope\"></i> <a href=\"mailto:person@domain.com\">person@domain.com</a></div>" +
  "<div class=\"gmaps-iw-url\"><i aria-hidden=\"true\" class=\"icon icon-fw icon-globe\"></i> <a href=\"http://www.example.com\">http://www.example.com</a></div>", 
  mapContainer = "mapCanvas", 
  markers = [["Sample marker", 53.010490, 18.604940, iwContent]];

function initialize() {
  var c,
  d = new google.maps.LatLngBounds,
  a = {
    scrollwheel: !1,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  c = new google.maps.Map(document.getElementById(mapContainer), a);
  c.setTilt(45);
  for (var e = new google.maps.InfoWindow, b, a = 0; a < markers.length; a++) b = new google.maps.LatLng(markers[a][1], markers[a][2]), d.extend(b), b = new google.maps.Marker({
    position: b,
    map: c,
    title: markers[a][0]
  }), google.maps.event.addListener(b, "click", function(a, b) {
    return function() {
      e.setOptions({ maxWidth: 240 });
      e.setContent('<div class="gmaps-iw">' + markers[b][3] + "</div>");
      e.open(c, a)
    }
  }(b, a)), c.fitBounds(d);
  var f = google.maps.event.addListener(c, "bounds_changed", function(a) {
    this.setZoom(15);
    google.maps.event.removeListener(f)
  })
};

google.maps.event.addDomListener(window, "load", initialize);
google.maps.event.addDomListener(window, "resize", initialize);
