const { GraphQLObjectType } = require('graphql');
const userQueries = require('../repository/user/queries');

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: userQueries.user,
    users: userQueries.users,
  }
});
