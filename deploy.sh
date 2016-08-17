#!/bin/bash
{
  # clear any previous sudo permission
    sudo -k

    # run inside sudo
    sudo sh <<SCRIPT
    rm -fdr WHSTLR
    git clone https://github.com/jdtorregrosas/WHSTLR.git
    cd WHSTLR
    git checkout master
    git pull
    rm -fdr node_modules/*
    npm install
    npm run bower
    node app.js
    echo "Now running WHSTLR in production"

    SCRIPT
}
