// The magic that happens in here is so stupid 
// that you don't even want to read it. 

var unparsedData = ['| [Chuck](http://www.imdb.com/title/tt0934814) | 91 | 43min | Yes | TBR | [+](https://github.com/kamilogorek) |', '| [Cowboy Bebop](http://www.imdb.com/title/tt0213338/) | 26 | 25min | No | TBR | [+](https://github.com/datrio) |', '| [Homeland](http://www.imdb.com/tt1796960) | 24 | 60min | Yes | TBR | [+](https://github.com/tobeytailor)[+](https://github.com/shorang) |', '| [Louie](http://www.imdb.com/title/tt1492966) | 39 | 23min | Yes | TBR | [+](https://github.com/kamilogorek) |', '| [Mad Men](http://www.imdb.com/title/tt0804503) | 65 | 45min | Yes | TBR | [+](https://github.com/kamilogorek)[+](https://github.com/datrio) |', '| [Modern Family](http://www.imdb.com/title/tt1442437/) | 86 | 30min | Yes | TBR | [+](https://github.com/afronski) |', '| [My Little Pony: Friendship is Magic](http://www.imdb.com/title/tt1751105/) | 65 | 22min | Yes | TBR | [+](https://github.com/dos1) |', '| [My Name Is Earl](http://www.imdb.com/title/tt0460091) | 96 | 30min | No | TBR | [+](https://github.com/kamilogorek) |', '| [Numb3rs](http://www.imdb.com/title/tt0433309/) | 118 | 43min | No | TBR | [+](https://github.com/afronski) |', '| [Oz](http://www.imdb.com/title/tt0118421) | 56 | 55min | No | TBR | [+](https://github.com/kamilogorek) |', '| [Parks and Recreations](http://www.imdb.com/title/tt1266020) | 83 | 21min | Yes | TBR | [+](https://github.com/kamilogorek) |', '| [Person of Interest](http://www.imdb.com/title/tt1839578) | 39 | 43min | yes | TBR | [+](https://github.com/shorang) |', '| [Pitbull](http://www.imdb.com/title/tt1096980) | 31 | 45min | No | TBR | [+](https://github.com/kamilogorek)[+](https://github.com/afronski) |', '| [Sons of Anarchy](http://www.imdb.com/title/tt1124373) | 56 | 45min | Yes | TBR | [+](https://github.com/kamilogorek)[+](https://github.com/tobeytailor) |', '| [Spartacus](http://www.imdb.com/title/tt1442449) | 33 | 60min | Yes | TBR | [+](https://github.com/kamilogorek)[+](https://github.com/datrio)[+](https://github.com/afronski)[+](https://github.com/tobeytailor) |', '| [The Following](http://www.imdb.com/title/tt2071645) | 5 | 43min | yes | TBR | [+](https://github.com/shorang) |', '| [The Newsroom](http://www.imdb.com/tt1870479) | 10 | 60min | Yes | TBR | [+](https://github.com/tobeytailor) |', '| [The Office](http://www.imdb.com/title/tt0386676) | 179 | 22min | Yes | TBR | [+](https://github.com/kamilogorek) |', '| [The Pacific](http://www.imdb.com/tt0374463) | 10 | 60min | No | TBR | [+](https://github.com/tobeytailor) |', '| [The Shield](http://www.imdb.com/tt0286486) | 88 | 42min | No | TBR | [+](https://github.com/tobeytailor) |', '| [The Sopranos](http://www.imdb.com/tt0141842) | 86 | 55min | No | TBR | [+](https://github.com/tobeytailor) |', '| [The Walking Dead](http://www.imdb.com/title/tt1520211/) | 28 | 44min | Yes | TBR | [+](https://github.com/datrio)[+](https://github.com/afronski)[+](https://github.com/tobeytailor)[+](https://github.com/shorang) |', '| [The West Wing](http://www.imdb.com/title/tt0200276/) | 156 | 42min | No | TBR | [+](https://github.com/datrio) |', '| [Wilfred](http://www.imdb.com/title/tt1703925) | 26 | 30min | Yes | TBR | [+](https://github.com/kamilogorek) |'];

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
  // 
  parsed.votes = splited[5].split('[+](https://github.com/').map(function(el){ return el.replace(')', '').replace(' |', ''); });
  parsed.votes.splice(0,1);
  //   
  return parsed;
  } catch(e) {
    console.log('ERROR', e, ' w ', parsed.title);
  }
}

unparsedData.forEach(function(chunk){
  parsedData.push(Parser(chunk));
});

document.body.innerHTML = JSON.stringify(parsedData);