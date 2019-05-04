const expressGraphQL = require('express-graphql');
const schema = require('../schema/index');

module.exports = expressGraphQL({
  schema,
  graphiql: true
});
