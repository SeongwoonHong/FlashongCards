const { GraphQLObjectType } = require('graphql');
const userMutations = require('../repository/user/mutations');
const cardMutations = require('../repository/card/mutations');

module.exports = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    signup: userMutations.signup,
    login: userMutations.login,
    addCard: cardMutations.addCard,
    deleteCard: cardMutations.deleteCard,
  }
});
