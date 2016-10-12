var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'testyoexpress'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/local'
  },

  test: {
    root: rootPath,
    app: {
      name: 'testyoexpress'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/testyoexpress-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'testyoexpress'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/testyoexpress-production'
  }
};

module.exports = config[env];
