var fs = require('fs');

var ghClient = require('./gh_client');
var omdbClient = require('./omdb_client');

var async = require('async');
var request = require('request');
var download = require('download');

var download_covers = true;

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
        .on('close', next);
    });
  }

  if (!chunkv.votes) {
    return callback();
  }

  async.each(chunkv.votes, getAvatar, callback);
}

var omdbAction = function(chunko, callback) {
  var omdbCallback = function(err, resp) {
    if (err) {
      return callback(null);
    }

    if (resp.poster && resp.poster !== "N/A" && download_covers) {
      var dw = download({
        url: resp.poster,
        name: chunko.title.toLowerCase().replace(/[^A-Za-z0-9]/gi, '-') + '.jpg'
      }, './data/build/assets/covers');

      dw.on('close', function() {
        console.log('got', chunko.title);
        if (!chunko.episodeLength) {
          chunko.episodeLength = resp.episodeLength;
        }
        callback(null, chunko);
      });

      dw.on('error', function(err) {
        console.log('ERROR!', err);
        callback(null); // Ignore error for now
      });
    } else {
      if (!chunko.episodeLength) {
        chunko.episodeLength = resp.episodeLength;
      }
      callback(null, chunko);
    }
  }

  if (!chunko.title) {
    console.log('Skipping', chunko.title);
    return callback();
  }

  console.log('Starting ', chunko.title);
  //if (chunko.imdb)
    omdbClient(chunko.imdb, omdbCallback);
  //else
    //callback();
}

module.exports = {
  build: buildChunk,
  download: function(value) {
    download_covers = value;
  }
}
