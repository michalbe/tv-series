(function() {

  var app = angular.module('filters', []);

  app.filter('min2hours', function() {
    return function(min) {
      var hours = ~~(min/60);
      var minutes = min%60;

      if (hours < 10) {
        hours = '0' + hours.toString();
      }

      if (minutes < 10) {
        minutes = '0' + minutes.toString();
      }

      return hours + 'h ' + minutes + 'm';
    };
  });

  app.filter('slug', function() {
    return function(title) {
      return title.toLowerCase().replace(/[^A-Za-z0-9]/gi, '-');
    }
  });

})();
