# WHSTLR
### (What happened since the last release?)

**********************************

When some people is working on the same project in the same repository, in different features, can be difficult to have the enough comunication in order to tell all the included features in the release. All this information is better to have documented in your release notes. But how can you write everything that all the team did?. Where write all the team everything that makes? Normally in your commit comments, you write your changes. The main idea od WHSTLR is to make easier your release notes writing. To write a good list of features with just a little of your effort. So that you can read them, they must be in a good format, saved in your system and give good information.

## MVP Feature list (v1.0)
- Show git commit history since last release tag or since the beginning of the repository.
- Write in a easy-to-undertand format (markdown?)
- Provide good (enough) information
- Is flexible enough to select an specific release tag
- Have an interface easy-to-use
- Show error messages in a transparent way

## Feature Backlog
- ...
- ...

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
* Write your repository URL e.g. `https://github.com/jdtorregrosas/releaseNotesPrinter.git` in the Repository field
* (Optional) Write the last Tag to log your commits starting by it e.g. `v1.0.0`
* Write the version that you want to be showed in your release file
* Generate!
* You can see the file in the browser or search it in your releases directory

> NOTE: The file is generated in markdown format
