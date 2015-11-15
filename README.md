# Problem Statement

Develop a web application which would let the user help connect buyer and seller through one portal.

# Technology Stack

This application is built on MEAN stack. 

# How to Run

## Prerequisites
1. MongoDB 3.0.x
2. NodeJS 0.12

If you're running fresh ubuntu installation, run following script to install software packages

    ./osinstall.sh

## Install Dependency
1. Install npm modules: `npm install`
2. Install bower dependencies `bower install`

## Loading Sample Database
1. Download sample database from 

    https://bitbucket.org/inabhi9/uassign-catchthatbus-demo/downloads/mongodump.zip
    
2. Extract it

    unzip mongodump.zip
    
3. Restore

    mongorestore -d catchthatbus catchthatbus

## Run
1. Start up the server: `npm start`
2. View in browser at http://localhost:8080

If you have any questions, email me at [in.abhi9@gmail.com](mailto:in.abhi9@gmail.com).


## Demo url
[http://catchthatbus.demo.abhi9.in/](http://catchthatbus.demo.abhi9.in/)

## Implemented Features
- CRUD examples
- Authentication
- Search
- Cart
