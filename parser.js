
var parsedData = [];
var Parser = function(data) {
  try {
  var parsed = {};
  
  var splited = data.split(' | ');
  parsed.title = splited[0].split('](')[0].replace('| [', '');
  parsed.imdb = splited[0].split('](')[1].replace(')', '')
  parsed.episodes = splited[1];
  parsed.episodeLength = parseInt(splited[2], 10);
  parsed.stillWatching = splited[3].split(' ')[0] === 'Yes' ? 1 : 0;

  return parsed;
  } catch(e) {
    console.log('ERROR', e, ' w ', parsed.title);
  }
}

unparsedData.forEach(function(chunk){
  parsedData.push(Parser(chunk));
});

document.body.innerHTML = JSON.stringify(parsedData);