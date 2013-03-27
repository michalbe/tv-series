var Renderer = function(data){
  var parent = document.getElementById('series');
  var globalTotalMinutes = 0;
  var globalTotalEpisodes = 0;
  
  var render = function(chunk) {
    var element = document.createElement('tr');
    
    var title = document.createElement('td');
    title.className = "title";
    element.appendChild(title);
    
    var episodes = document.createElement('td');
    episodes.className = "episodes";
    element.appendChild(episodes);
    
    var episodeLength = document.createElement('td');
    episodeLength.className = "episodelength";
    element.appendChild(episodeLength);
    
    var totalLength = document.createElement('td');
    totalLength.className = "totallength";
    element.appendChild(totalLength);
    
    var stillWatching = document.createElement('td');
    stillWatching.className = "stillWatching";
    element.appendChild(stillWatching);
    
    if (chunk.imdb) {
      title.innerHTML = "<a href=" + chunk.imdb + ">" + chunk.title + "</a>";
    } else {
      title.innerHTML = chunk.title;
    }
    episodes.innerHTML = chunk.episodes + (chunk.totalEpisodes ? "/" + chunk.totalEpisodes : '');

    if (!chunk.totalTime) {
      episodeLength.innerHTML = chunk.episodeLength + "min";
      globalTotalEpisodes += parseInt(chunk.episodes, 10);      
    }

    
    var totalMinutes;
    if (chunk.totalTime) {
      totalMinutes = chunk.totalTime
    } else {
      totalMinutes = chunk.episodes * chunk.episodeLength;
      globalTotalMinutes += totalMinutes;
    }
    
    totalLength.innerHTML = ~~( totalMinutes / 60) + "h " + 
      (totalMinutes%60 === 0 ? '' : totalMinutes%60 + "min"); 
    
    stillWatching.innerHTML = chunk.stillWatching ? "Yes" : "No";
    
    parent.appendChild(element);
  }
  
  data.forEach(function(dataChunk) {
    render(dataChunk);
  });
  
  render({
    title: "TOTAL",
    episodes: globalTotalEpisodes,
    totalTime: globalTotalMinutes
  });
};