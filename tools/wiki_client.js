var WikiClient = function(showName, elementId){

  var wikiApi = 'http://en.wikipedia.org/w/api.php?format=json&action=query&titles=' + showName +'&prop=revisions&rvprop=content&callback=parseResponse&requestid=' + elementId;

  if (showName === 'Simpsons') {
    wikiApi = 'http://en.wikipedia.org/w/api.php?action=expandtemplates&text={{Template:The_Simpsons_episode_count}}&format=json&callback=parseSimpsons&requestid=' + elementId;
  }

  var script = document.createElement('script');
  script.src = wikiApi;
  document.body.appendChild(script);
}

var trash = [
  '([[Doctor Who missing episodes|97 missing]]) <!--As of 23 October 2013. Does not count "The Infinite Quest" or \'\'Dreamland\'\' or other spin-offs. Do not report fewer than 97 missing episodes until this has been reliably confirmed.-->',
  '([[List of MacGyver episodes|List of episodes]])<br />2 tv [[List of MacGyver episodes#TV Movies|films]]',
  '+ [[Burn Notice: The Fall of Sam Axe|1 movie]]',
  '+ original pilot<ref>{{cite web |url=http://www.eonline.com/news/117929/will-fox-air-dollhouse-s-final-episode-or-not |title=Will Fox Air Dollhouse\'s Final Episode or Not? |date=April 9, 2009 |accessdate=January 14, 2013',
  '+ (82 aired)',
  '<ref>This includes the special episodes "Documentary Special" and "Isaac and Ishmael".</ref>',
  '([[List of The Pacific episodes|List of episodes]])'
];

var untrashData = function(data) {
  trash.forEach(function(trEl) {
    data = data.replace(trEl, '');
  });

  data = data.replace(/<!--(.*?)-->/gm, "");

  return data.replace('=', '');
}

function parseResponse(response) {
  //console.log(response);
  var pages = response.query.pages;
  var page = Object.keys(pages);
  var content = pages[page].revisions[0]['*'];
  var index = content.indexOf('num_episodes');
  var content = content.slice(index, index+300);

  content = untrashData(content);
  //OMG it's so ugly that I don't actually believe it will work
  content = content.split('|')[0].trim().split(' ').pop();

  //console.log(content);

  parseWikiResponse({
    id: response.requestid,
    content: content
  });
}

function parseSimpsons(response) {
  parseWikiResponse({
    id: response.requestid,
    content: response.expandtemplates['*']
  });
}
