const express = require('express');
const graphql = require('./graphql');

module.exports = class Routes {
  constructor(app) {
    if (!app) {
      throw new Error('You must provide an instance of express');
    }

    app.use('/graphql', graphql);
  }
}
