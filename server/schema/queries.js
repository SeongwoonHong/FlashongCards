const { GraphQLObjectType } = require('graphql');
const userQueries = require('../model/user/userQueries');
const cardQueries = require('../model/card/cardQueries');

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: userQueries.user,
    users: userQueries.users,
    cards: cardQueries.cards,
    checkLogin: userQueries.checkLogin
  }
});
