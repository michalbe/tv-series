var series = require('../data/data');
var fs = require('fs');

var update = function(title) {
  var match = false;
  for (var i in series) {
    if (series[i].title === title) {
      match = true;
      console.log('Found show: ' + title);
      console.log('Current episodes numer: ' + series[i].episodes);
      console.log('Last watched: ' + series[i].lastWatched);
      console.log('Updating ------- ');
      series[i].episodes++;
      series[i].lastWatched = incrementLastWatched(series[i].lastWatched);
      console.log('Current episodes numer: ' + series[i].episodes);
      console.log('Last watched: ' + series[i].lastWatched);
      break;
    }
  }

  if (!match) {
    console.log('TV Show ' + title + ' not found!');
  } else {
    console.log('Writing file');
    fs.writeFile("./data/data.js", "module.exports = " + JSON.stringify(series), function(err) {
      if(err) {
        console.log('Error while saving file, try again: ');
        console.log(err);
      } else {
        console.log("Updated file was saved: series.js");
      }
    });
  }
}

var incrementLastWatched = function(value) {
  var lw = value.split('E');
  lw[1] = parseInt(lw[1], 10);
  lw[1]++;
  return lw.join('E');
}

update(process.argv[2]);
