var Renderer = function(data, parent){
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

    if (chunk.votes) {
      var votes = document.createElement('td');
      votes.className = "votes";
      element.appendChild(votes);
    }

    if (chunk.imdb) {
      title.innerHTML = "<a href=" + chunk.imdb + ">" + chunk.title + "</a>";
    } else {
      title.innerHTML = chunk.title;
    }

    var episodesData = chunk.episodes + (chunk.totalEpisodes ? "/" + chunk.totalEpisodes : '');
    if (chunk.lastWatched) {
      episodesData = "<a class='last-watched' title='" + chunk.lastWatched +"'>" + episodesData + "</a>";
    }

    episodes.innerHTML = episodesData;

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

    if (chunk.votes) {
      var votesContent = '';
      chunk.votes.forEach(function(voter){
        votes.innerHTML += "<a href='https://github.com/"+voter+"'>+</a> ";
      });
    }

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

  globalTotalMinutes = globalTotalMinutes = 0;
};
