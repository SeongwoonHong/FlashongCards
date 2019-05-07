const { GraphQLObjectType } = require('graphql');
const userMutations = require('../repository/userRepository/mutations');
const cardMutations = require('../repository/cardRepository/mutations');

module.exports = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    signup: userMutations.signup,
    login: userMutations.login,
    addCard: cardMutations.addCard,
    deleteCard: cardMutations.deleteCard,
  }
});
