var fs = require('fs');
var proposals = require('./data/proposals');
var buildChunk = require('./tools/build_chunk');
module.exports = function(grunt) {

  grunt.registerTask('proposals', "Build proposals list", function() {
    proposals.forEach(function(chunk) {
      buildChunk(chunk);
    });
  });

  grunt.registerTask('default', ['proposals']);

};
