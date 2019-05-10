const expressGraphQL = require('express-graphql');
const schema = require('../schema/index');

module.exports = expressGraphQL(req => ({
  schema,
  graphiql: true,
  context: {
    user: req.user
  }
}));
