var request = require('request');

module.exports = function(id, callback) {

    var url = 'http://www.omdbapi.com/?i=';

    request(url + id, function(err, req, data) {
        var response = JSON.parse(data);
        var resp = {
          'episodeLength' : parseInt(response.Runtime, 10),
          'poster' : response.Poster
        }
        callback(resp, id);
    });
};
