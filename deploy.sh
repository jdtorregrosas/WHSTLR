#!/bin/bash

git checkout master
git pull
rm -fdr node_modules/*
npm install
npm run bower
forever stopall
NODE_ENV=production forever app.js
echo "Now running WHSTLR in production" 
