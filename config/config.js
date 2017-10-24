var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

if (!process.env.IS_HEROKU) {
  var dotenv = require('dotenv').config({path: rootPath + '/.env'});
}

var config = {
  root: rootPath,
  app: {
    name: 'wp-xplat-cli'
  },
  env: process.env.ENV || '',
  port: process.env.PORT || '',
  page_access_token: process.env.PAGE_ACCESS_TOKEN || '',
  verify_token: process.env.VERIFY_TOKEN || '',
};

module.exports = config;
