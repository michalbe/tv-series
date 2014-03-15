var GHClient = (function() {
  var avatars = {};
  var url = 'https://api.github.com/users/';

  var getAvatar = function(name, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4) {
        avatars[name] = JSON.parse(xhr.responseText).avatar_url;
        callback(avatars[name]);
      }
    }

    xhr.open('GET', url + name, true);
    xhr.send();
  }

  return function(name, cb) {
    if (name in avatars) {
      cb(avatars[name]);
      return;
    } else {
      getAvatar(name, cb);
    }
  }
})();
