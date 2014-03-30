var fs = require('fs');

var ghClient = require('./gh_client');
var omdbClient = require('./omdb_client');

var async = require('async');
var request = require('request');
var download = require('download');

var buildChunk = function(chunkb, callback) {
  async.parallel({
    github: async.apply(votesAction, chunkb),
    omdb: async.apply(omdbAction, chunkb)
  }, callback);
}

var votesAction = function(chunkv, callback){
  var avatars = [];
  var votes = chunkv.votes;

  function getAvatar(user, next) {
    ghClient(user, function(err, url, name) {
      if (err) {
        return next(err);
      }

      request(url)
        .pipe(fs.createWriteStream('./data/build/assets/avatars/' + user + '.jpg'))
        .on('error', next)
        .on('end', next);
    });
  }

  async.each(chunkv.votes, getAvatar, callback);
}

var omdbAction = function(chunko, callback) {
  var omdbCallback = function(err, resp) {
    if (err) {
      return callback(null);
    }

    if (resp.poster) {
      var dw = download({
        url: resp.poster,
        name: chunko.title.toLowerCase().replace(/[^A-Za-z0-9]/gi, '-') + '.jpg'
      }, './data/build/assets/covers');

      dw.on('close', function() {
        console.log('got', chunko.title);
        if (!chunko.episodeLength) {
          chunko.episodeLength = resp.episodeLength;
        }
        callback();
      });

      dw.on('error', function(err) {
        console.log('ERROR!', err);
        callback(null); // Ignore error for now
      });
    }
  }

  if (!chunko.title) {
    console.log('Skipping', chunko.title);
    return callback();
  }

  console.log('Starting ', chunko.title);
  omdbClient(chunko.imdb, omdbCallback);
}

module.exports = buildChunk;
