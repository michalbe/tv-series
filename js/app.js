var app = angular.module('tvshows', ['filters']);

app.controller('ListController', [ '$http', function($http) {
  var list = this;
  list.shows = [];

  $http.get('data/series.js').success(function(data) {
    list.shows = data;
  })

}]);
