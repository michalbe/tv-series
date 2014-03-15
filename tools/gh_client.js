var GHClient = (function() {
  var default_av = 'https://i2.wp.com/a248.e.akamai.net/assets.github.com/images/gravatars/gravatar-user-420.png';
  var url = 'https://api.github.com/users/';

  var getAvatar = function(name, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4) {
        callback(JSON.parse(xhr.responseText).avatar_url || default_av, name);
      }
    }

    xhr.open('GET', url + name, true);
    xhr.send();
  }

  return function(name, cb) {
      getAvatar(name, cb);
  }
})();
