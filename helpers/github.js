const request = require('request');
const config = require('../config.js');

let getReposByUsername = ((username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  request(options, function(error, response, body) {
      if (error) {
        callback(error)
      } else {
        callback(null, body);
      }
    }
  );

});

module.exports.getReposByUsername = getReposByUsername;