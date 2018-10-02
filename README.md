# GitHub Avatar Downloader

## Problem Statement

Given a GitHub repository name and owner, download all the contributors' profile images and save them to a subdirectory, `avatars/`.

## Expected Usage

This program should be executed from the command line, in the following manner:

`node download_avatars.js jquery jquery`

## Functional Requirements
As an open source project leader,
I want a folder with the avatars of all of my github project's contributors
so that I can use them in a website.

GIVEN
I have node installed
I am in the shell
I have your file in my current folder

WHEN
I execute your file using node, providing a github user and repository as command-line arguments For example: `$ node download_avatars.js nodejs node`

THEN
I should find a folder called `avatars` in my current directory
The `avatars` folder should contain images corresponding to the avatars of the contributors of the repo
The name of each image file should be the contributor's name and the file extension (ex. `johnny.png`)

## Setting up your GitHub API token
Follow this link to generate a new token with github: https://github.com/settings/tokens

Once generated, copy the token into secret.js in place of "YOUR-TOKEN-HERE"

## Dependencies
- 'request' library to make the HTTP requests
