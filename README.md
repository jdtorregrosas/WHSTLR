# WHSTLR
### (What happened since the last release?)

**********************************

When some people is working on the same project in the same repository, in different features, can be difficult to have the enough comunication in order to tell all the included features in the release. All this information is better to have documented in your release notes. But how can you write everything that all the team did?. Where write all the team everything that makes? Normally in your commit comments, you write your changes. The main idea od WHSTLR is to make easier your release notes writing. To write a good list of features with just a little of your effort. So that you can read them, they must be in a good format, saved in your system and give good information.

## MVP Feature list (v1.0)
- Swagger specification
- Show git commit history since last release tag or since the beginning of the repository.
  ✔ Title
  ✔ Description
  ✔ Author
  - Date (format human readable)
  - Title is linked to Commit diff (e.g. http://gitlab.local.coliquio.de/col/col-dev/commit/2b7d182b33b67a9631b86cc0d6b55d83383d4ac0) ? ? how to make it easy
- Merge request history since last release:
  ✔ Title
  ✔ Date (format human readable)
  ✔ Description
  ✔ Author
  ✔ Branch
  - Title is linked to MR on Gitlab (e.g. http://gitlab.local.coliquio.de/col/col-dev/merge_requests/336)
- Show messages of most important errors in a transparent way
✔ Settings interface for storing GitLab token
- UI:
  ✔ After selection of repo, automatically insert the last release tag
  - Show headline (project name and tag)

## Feature Backlog
- UI: Dropdown for available tags
- UI: List of available repos
- Is flexible enough to select an specific release tag
- Date
- Show messages of all errors in transparent way
- Offer support for GitHub
- Offer support for BitBucket

## Requirements
* nodejs, npm
* git running local

## How it works
* Clone your repository's specific branch
* Log the commit messages, until the selected tag
* Make a 'releaseNotes' file

## How to use it
* Clone the repo `https://github.com/jdtorregrosas/releaseNotesPrinter.git`
* Make `npm install`
* Make  `npm start`
* Make `bower install`
 * If bower throw permission errors in linux use: `sudo chown -R $USER:$GROUP ~/.config`
* Go to `http://localhost:3000/index`
