var app = angular.module('tvshows', []);

app.filter('min2hours', function() {
  return function(min) {
    return ~~( min / 60) + "h" +
    (min%60 === 0 ? '' : ' ' + min%60 + "m");
  };
});

app.filter('slug', function() {
  return function(title) {
    return title.toLowerCase().replace(/[^A-Za-z0-9]/gi, '-');
  }
});

app.controller('ListController', [ '$http', function($http) {
  var list = this;
  list.shows = [];

  $http.get('data/series.js').success(function(data) {
    list.shows = data;
  })

}]);
