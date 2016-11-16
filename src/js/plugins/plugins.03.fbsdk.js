// == Variables for Facebook SDK
var fbLang = 'pl_PL',
    fbSdkVer = '2.8',
    fbFanPage = 'facebook',
    fbRoot = '<div id="fb-root"></div>',
    fbLikeBtn = '<div class="fb-like" data-href="https://www.facebook.com/' + fbFanPage + '" data-layout="button_count" data-action="like" data-colorscheme="light" data-size="small" data-show-faces="false" data-share="false"></div>',
    fbPagePlugin = '<div class="fb-page" data-href="https://www.facebook.com/' + fbFanPage + '" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">' +
      '<blockquote cite="https://www.facebook.com/' + fbFanPage + '" class="fb-xfbml-parse-ignore">' +
        '<a href="https://www.facebook.com/' + fbFanPage + '">' + fbFanPage + '</a>' +
      '</blockquote>' +
    '</div>';

// == Facebook SDK
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/" + fbLang + "/sdk.js#xfbml=1&version=v" + fbSdkVer;
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
