const { GraphQLObjectType } = require('graphql');
const userQueries = require('../repository/userRepository/queries');
const cardQueries = require('../repository/cardRepository/queries');

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: userQueries.user,
    users: userQueries.users,
    cards: cardQueries.cards,
    checkLogin: userQueries.checkLogin
  }
});
