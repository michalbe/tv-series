var fs = require('fs');
var each = require('async-each');

var series = require('../data/data');
var proposals = require('../data/proposals');
var buildChunk = require('./build_chunk');

// build what(all, series, proposal) downlaod(true, false);


buildChunk.download(process.argv[3]);

var buildList = function(list, filename, variable, callback) {
  var finalChunks = [];
  each(list, buildChunk.build, function(err, newChunks) {
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

var buildProposals = function(callback) {
  buildList(proposals, 'proposals.js', 'toConsider', function() {
    console.log('Proposals build finished...');
    if (typeof callback === 'function') {
      callback();
    }
  });
}

var buildSeries = function(callback) {
  buildList(series, 'series.js', 'series', function() {
    console.log('Series build finished...');
    if (typeof callback === 'function') {
      callback();
    }
  });
}

switch (process.argv[2]) {
  case 'all':
    buildProposals(
      buildSeries(
        function() {
          console.log('Building finished...');
        }
      )
    );
    break;
  case 'series':
    buildSeries(
      function() {
        console.log('Building finished...');
      }
    );
    break;
  case 'proposals':
    buildProposals(
      function() {
        console.log('Building finished...');
      }
    );
  default:
    console.log('Wrong parameters!');
}
