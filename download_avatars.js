var request = require('request');
var path = require('path');
var fs = require('fs');
require('dotenv').config();

console.log('Welcome to the GitHub Avatar Downloader!');

// Check required input argments provided
var args = process.argv.slice(2);
if (args.length !== 2) {
  console.log('Error: Please provide 2 arguments as <user> <repo>, ie. $ node download_avatars.js jquery jquery');
}

function getRepoContributors(repoOwner, repoName, cb) {
  var GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  // Check that API token exists
  if (!GITHUB_TOKEN) {
    console.log('Error! Ensure API token is saved in .env as GITHUB_TOKEN=<your_token>')
    return;
  }
  // GET request options
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + GITHUB_TOKEN
    }
  };
  // Send and return the request object
  request(options, function(err, res, body) {
    cb(err, body);
  });
}

// Download an image from URL and save to filepath
function downloadImageByURL(url, filePath) {
  // Check that the write directory exists
  var dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
  // Request the file and pipe to stream
  request(url).pipe(fs.createWriteStream(filePath)
  .on('end', function () {
    console.log(`Finished writing to ${filePath}`);
  }))
}

// Download list of all repo contributors and convert into JSON file 
getRepoContributors(args[0], args[1], function(err, result) {
  var contributors = JSON.parse(result);
  // log  any errors associated with accessing the information
  console.log("Errors:", err);
  // loop through each result obj and download the associated avatar URL
  contributors.forEach(function(elem, index) {
    // forEach contributors elem, download the avatar picture and confirms via a console.log()
    downloadImageByURL(elem.avatar_url, `avatars/${elem.login}.jpg`);
    console.log(`Downloaded ${elem.login}.jpg`);

  });
});