const { GraphQLObjectType } = require('graphql');
const userQueries = require('../repository/user/queries');
const cardQueries = require('../repository/card/queries');

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: userQueries.user,
    users: userQueries.users,
    cards: cardQueries.cards,
  }
});
