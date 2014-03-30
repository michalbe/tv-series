var ghClient = require('./gh_client');
var omdbClient = require('./omdb_client');

var download = require('download');

var globalCb;

var omdbResp = function(chunkr) {
  if (chunkr.imdb && (!chunkr.poster || !chunkr.episodeLength)) {
    console.log('Starting ', chunkr.title);
    omdbAction(chunkr, globalCb);
  } else {
    console.log('Skipping', chunkr.title);
  }
}

var buildChunk = function(chunkb, callback) {
  globalCb = callback;
  if (chunkb.votes) {
    votesAction(chunkb, omdbResp);
  } else {
    console.log('NO VOTES');
    omdbResp(chunkb);
  }
}

var votesAction = function(chunkv, callback){
  var avatars = [];
  var votes = chunkv.votes;
  var downloaded = 0;
  var avatarCallback = function(avatar, name) {
    avatars.push(
      {
        name: name + '.jpg',
        url:  avatar
      }
    );

    if (avatars.length === votes.length) {
      var dw = download(avatars, './data/build/assets/avatars');
      dw.on('close', function(){
        downloaded++;
        if (downloaded === votes.length) {
          //console.log('Avatars of voter for ' + chunk.title + ' downloaded');
          callback(chunkv); //LOL, NOPE
        }
      });

      dw.on('error', function(err) {
        console.log('ERROR!', err);
        callback(chunkv);
      });
    }
  }
  for (user in votes) {
    ghClient(votes[user], avatarCallback);
  }
}

var omdbAction = function(chunko, callback) {
  var omdbCallback = function(resp) {
    if (resp.poster) {
      var dw = download({
        url: resp.poster,
        name: chunko.title.toLowerCase().replace(/[^A-Za-z0-9]/gi, '-') + '.jpg'
      }, './data/build/assets/covers');

      dw.on('close', function() {
        if (!chunko.episodeLength) {
          chunko.episodeLength = resp.episodeLength;
        }
        callback(chunko);
      });

      dw.on('error', function(err) {
        console.log('ERROR!', err);
        callback(chunko);
      });
    }
  }
  omdbClient(chunko.imdb, omdbCallback);
}

module.exports = buildChunk;
