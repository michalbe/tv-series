/* global $ */
(function() {
  'use strict';


  var collection = series;

  $.each(collection, function(index, el) {
    $('<div></div>').css(
      'backgroundImage',
      'url(../data/build/assets/covers/' +
      el.title.toLowerCase().replace(/[^A-Za-z0-9]/gi, '-') +
      '.jpg)'
    )
    .addClass('cover')
    .appendTo($('body'));
  });
})();

// {
//   "title":"11.22.63",
//   "imdb":"tt2879552",
//   "episodes":8,
//   "stillWatching":1,
//   "lastWatched":"S01E08",
//   "episodeLength":60
// }
