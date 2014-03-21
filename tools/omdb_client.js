var OMDBClient = function(id, callback) {
    var url = 'http://www.omdbapi.com/?i=';

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4) {
        var response = JSON.parse(xhr.responseText);
        var resp = {
          'episodeLength' : parseInt(response.Runtime, 10),
          'poster' : response.Poster
        }
        callback(resp, id);
      }
    }

    xhr.open('GET', url + id, true);
    xhr.send();
};
