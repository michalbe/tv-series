var request = require('request');

module.exports = function(id, callback) {
  if (!id) {
    return callback(null, {}, null);
  }

  var url = 'http://www.omdbapi.com/?i=';

  request(url + id, function(err, req, data) {
    if (err) {
      return callback(err);
    }

    var response = JSON.parse(data);
    var resp = {
      'episodeLength' : parseInt(response.Runtime, 10),
      'poster' : response.Poster
    }
    callback(null, resp, id);
  });
};
