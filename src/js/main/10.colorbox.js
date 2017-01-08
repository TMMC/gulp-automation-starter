// == Colorbox: change defaults
// var defOverwrite = {
//   // fixed : true,
//   initialWidth : 280,
//   initialHeight : 280,
//   maxWidth : "90%",
//   maxHeight : "90%",
//   opacity : 0.85,
//   onComplete : function() {
//     $("#cboxPrevious, #cboxNext, #cboxSlideshow, #cboxClose").attr('title', function() {
//       return $(this).text();
//     });
//   }
// };
// var defLang = {
//   previous : "poprzednie",
//   next : "następne",
//   current : "{current} z {total}",
//   close : "zamknij",
//   slideshowStart : "rozpocznij pokaz slajdów",
//   slideshowStop : "zatrzymaj pokaz slajdów",
//   xhrError : "Nie udało się wczytać zawartości.",
//   imgError : "Nie udało się wczytać zdjęcia."
// };

// == Colorbox: overwrite defaults
// $.extend($.colorbox.settings, defOverwrite, defLang);

// == Colorbox: single photo
// $('a.thumb, a.entry-media').colorbox({
//   title : function() {
//     var newTitle = $(this).find("img").attr("alt");
//     return '<b>' + newTitle + '</b>';
//   }
// });

// == Colorbox: text links (need 'data-title' attr)
// $('a.media-link').colorbox({
//   title : function() {
//     var newTitle = $(this).attr("data-title");
//     return '<b>' + newTitle + '</b>';
//   }
// });

// == Colorbox: grouping into galeries without additional classes in html
// $('[class*=" media-set"], [class^="media-set"]').each(function(i) {
//   if (i < 10) {
//     var relName = 'gal-0' + i;
//   } else {
//     var relName = 'gal-' + i;
//   }
//   $(this).find('a').colorbox({
//     rel : relName,
//     returnFocus : false,
//     slideshow : true,
//     slideshowAuto : false,
//     title : function() {
//       var newTitle = $(this).find("img").attr("alt");
//       return '<b>' + newTitle + '</b>';
//     }
//   });
// });
