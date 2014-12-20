var series = require('../data/data');
var fs = require('fs');

var update = function(title) {
  title = title.replace(/\+/gi, ' ').toLowerCase();
  var match = false;
  var abbr;
  var currentSeason = 1;
  for (var i in series) {
    abbr = series[i].title.replace(/(\w)\w*\W*/g, function (_, i) {
      return i.toLowerCase();
    });

    if (abbr === title) title = series[i].title.toLowerCase();

    if (series[i].title.toLowerCase() === title) {
      match = true;
      currentSeason = series[i].lastWatched.split('E')[0].split('');
      currentSeason.shift();
      currentSeason = parseInt(currentSeason.join(''));
      console.log('Found show: ' + series[i].title);
      console.log('Current Season: ' + currentSeason);
      console.log('Updating ------- ');

      currentSeason = incrementSeason(currentSeason);

      if (series[i].lastWatched) {
        series[i].lastWatched = 'S' + currentSeason + 'E00';
      }

      console.log('Season incremented.');
      console.log('New last watched: ' + series[i].lastWatched);
      break;
    }
  }

  if (!match) {
    console.log('TV Show ' + title + ' not found!');
  } else {
    console.log('Writing file');
    fs.writeFile("./data/data.js", "module.exports = " + JSON.stringify(series, null, 2), function(err) {
      if(err) {
        console.log('Error while saving file, try again: ');
        console.log(err);
      } else {
        console.log("Updated file was saved: series.js");
      }
    });
  }
}

var incrementSeason = function(value) {
  value++;
  return value < 10 ? '0' + value : value;
}

update(process.argv[2]);
