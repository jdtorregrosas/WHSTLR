#!/bin/bash
rm -fdr WHSTLR
git clone http://gitlab.local.coliquio.de/devteam/WHSTLR.git
cd WHSTLR
git checkout master
git pull
rm -fdr node_modules/*
npm install
npm run bower
forever stopall
NODE_ENV=production forever app.js
echo "Now running WHSTLR in production" 
