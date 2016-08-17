#!/bin/bash
rm -fdr WHSTLR
git clone https://github.com/jdtorregrosas/WHSTLR.git
cd WHSTLR
git checkout master
git pull
rm -fdr node_modules/*
npm install --quiet --production
npm run bower
npm start
echo "Now running WHSTLR in production"
