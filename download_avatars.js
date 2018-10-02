var request = require('request');
var token = require('./secret'); // Your personal GitHub token
var fs = require('fs');

// Get command line input for repo owner name and repo name
var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

// Function get repo contributors
function getRepoContributors(repoOwner, repoName, callback) {
  // Create an object with a user-agent header (mandatory for API requests on GitHub)
 var options = {
   url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
   headers: {
     'User-Agent': 'request',
     'Authorization': `token {token.GITHUB_TOKEN}`
   }
 };
 // make a request for JSON, getting back an array of contributors
 if(repoOwner && repoName) {
   // pass the "options" object which includes the url and the headers
   request(options, function(err, resp, body) {
     // pass this data and parse (string to JSON obj) it the anonymous callback function
     callback(err, JSON.parse(body));
   });
 } else {
   console.log("please specify repoOwner and repoName");
 }
}

// Function to download avatar images for the supplied URLs and save the images to the specified file path
function downloadImageByURL(url, filePath) {
 // check the write directory exists
 var dirname = path.dirname(filePath);
 if (!fs.existsSync(dirname)) {
     fs.mkdirSync(dirname);
 }
 request.get(url)
         .on('error', function (err) {
           throw err;
         })
         .on('resp', function (resp) {
           console.log('Response Status Code: ', response.statusCode);
         })
         .on('end', function () {
           console.log('Download Completed.');
         })
        .pipe(fs.createWriteStream('./avatars/' + filePath + '.png'));
}

// Call getRepoContributors function
getRepoContributors(repoOwner, repoName, function callback(err, result) {
 console.log("Errors:", err);
 // callback loops through each item in the array
 result.forEach(function(contributor) {
  // bind avatar url value and login value to contributor and pass it to downloadImageByURL function and call it
  downloadImageByURL(contributor.avatar_url, contributor.login);
 });
});

//run "node download_avatars.js mxcmxc github-avatar-downloader" to test (output Error: null)
//run "node download_avatars.js mxcmxc" to test (output please specify repoOwner and repoName)