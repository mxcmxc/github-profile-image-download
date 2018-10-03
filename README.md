# GitHub Avatar Downloader

## Problem Statement
Use the GitHub API. Given a GitHub repository name and owner, download all the contributors' profile images and save them to a subdirectory folder called `avatars`.The `avatars` folder should contain images corresponding to the avatars of the contributors of the repoThe name of each image file should be the contributor's name and the file extension (ex. `johnny.png`).

## Run 
Your program should be executed from the command line in the following manner:

`node download_avatars.js USER PROJECT`
i.e. `node download_avatars.js nodejs node`
... where USER is any valid user (i.e. jquery) and PROJECT is a project belonging to that user (i.e. jquery).

## Setting up your GitHub API token
Follow this link to generate a new token with github: https://github.com/settings/tokens

Once generated, copy the token into .env in place of "YOUR-TOKEN-HERE"

## Dependencies
- `dotenv` for accessing GitHub API keys
- `fs` to save the avatar profile images
- `path` to work with directories and file paths
- `request` for managing HTTP requests
