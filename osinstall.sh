#!/usr/bin/env bash
# Tested with Ubuntu 14.04

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | \
        sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list

curl -sL https://deb.nodesource.com/setup_0.12 | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install nodejs g++ make libkrb5-dev mongodb-org zip unzip
