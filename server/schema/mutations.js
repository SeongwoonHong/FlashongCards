const { GraphQLObjectType } = require('graphql');
const userMutations = require('../repository/user/mutations');

module.exports = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    signup: userMutations.signup,
    login: userMutations.login,
  }
});
