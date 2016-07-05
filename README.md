![WHSTLR Logo](public/assets/images/whstlr-logo.png)
# WHSTLR
### (What happened since the last release?)

**********************************


Make easier to write release notes.

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
