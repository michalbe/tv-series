var request = require('request');

var GHClient = (function() {
  var default_av = 'https://i2.wp.com/a248.e.akamai.net/assets.github.com/images/gravatars/gravatar-user-420.png';
  var url = 'https://api.github.com/users/';

  var getAvatar = function(name, callback) {
    request(
      {
        url: url + name,
        headers: { "user-agent" : "twoja-stara-lambadziara 10.7" }
      }, function(err, response, body) {
        //console.log(body);
        callback(null, (body && JSON.parse(body).avatar_url) || default_av, name);
      }
    );
  }

  return function(name, cb) {
      getAvatar(name, cb);
  }
})();

module.exports = GHClient;
