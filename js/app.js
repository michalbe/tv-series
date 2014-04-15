var app = angular.module('tvshows', []);

app.filter('min2hours', function() {
  return function(min) {
    return ~~( min / 60) + "h " +
    (min%60 === 0 ? '' : min%60 + "min");
  };
});

var shows = [{
  "title" : "Anger Management",
  "imdb":"tt1986770",
  "episodes": 69,
  "stillWatching": 1,
  "lastWatched":"S02E59",
  "wiki":"Anger_Management_(TV_series)",
  "episodeLength": 21
}];

app.controller('ListController', function() {
  this.shows = shows;
});
