var fs = require('fs');

var proposals = require('../data/proposals');
var buildChunk = require('./build_chunk');


var newProposals = [];

proposals.forEach(function(chunk, index) {
  console.log('ENTER:', chunk.title);
  buildChunk(
    chunk,
    function(newChunk) {
      //console.log('EXIT:', newChunk.title);
      newProposals.push(newChunk);

      if (proposals.length === newProposals.length) {
        console.log('KOOONIEC!');
      }
    }
  );
});
