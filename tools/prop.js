var omdb = require('./omdb_client');
var showList = require('../data/proposals');
var fs = require('fs');

var id = process.argv[2];
var showExist = false;

omdb(id, function(err, data, id) {
  if (!err) {
    console.log('Show found: ', data.title);
    var newShow = {
      "title": data.title,
      "imdb": id,
      "episodes": 0,
      "stillWatching": 1,
      "votes": ["michalbe"]
    };

    showList.push(newShow);
    showList.sort(function(a, b) {
      if (a.imdb === b.imdb) {
        showExist = true;
      }
      return a.title.localeCompare(b.title);
    });

    if (!showExist) {
      fs.writeFile("./data/proposals.js", "module.exports = " + JSON.stringify(showList, null, 2), function(err) {
        if(err) {
          console.log('Error while saving file, try again: ');
          console.log(err);
        } else {
          console.log("Updated file was saved: proposals.js");
        }
      });
    } else {
      console.log('Show already exists on proposal list!');
    }
  }
});
