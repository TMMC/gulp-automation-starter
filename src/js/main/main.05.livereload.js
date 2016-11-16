// == Insert LiveReload script on localhost
if (locationHostname === "localhost" || locationHostname === "127.0.0.1") {
  // var lrSnippet = '<script src="//localhost:35729/livereload.js"></script>';
  var lrSnippet = '<script src="http://' + (locationHost || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></script>';
  body.append(lrSnippet);
}
