var fs = require('fs');

var each = require('async-each');
var proposals = require('../data/proposals');
var buildChunk = require('./build_chunk');

each(proposals, buildChunk, function(err, newProposals) {
  console.dir(arguments);
});
