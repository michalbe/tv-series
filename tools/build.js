var fs = require('fs');

var each = require('async-each');
var series = require('../data/data');
var proposals = require('../data/proposals');
var buildChunk = require('./build_chunk');

var buildList = function(list, filename, variable, callback) {
  var finalChunks = [];
  each(list, buildChunk, function(err, newChunks) {
    newChunks.forEach(function(chunk){
      finalChunks.push(chunk.omdb);
    });

    fs.writeFile("./data/build/data/" + filename, "var " + variable + " =" + JSON.stringify(finalChunks), function(err) {
      if(err) {
          console.log(err);
      } else {
          console.log("The file was saved: " + filename);
          if (typeof callback === 'function')
            callback();
      }
    });
  });
}

buildList(proposals, 'proposals.js', 'toConsider', function() {
  console.log('Proposals finished, goin\' fo da rest nigga');
  buildList(series, 'series.js', 'series', function() {
    console.log('LOL, DONE!');
  });
});
