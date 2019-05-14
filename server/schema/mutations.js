const { GraphQLObjectType } = require('graphql');
const userMutations = require('../model/user/userMutations');
const cardMutations = require('../model/card/cardMutations');

module.exports = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    signup: userMutations.signup,
    login: userMutations.login,
    addCard: cardMutations.addCard,
    deleteCard: cardMutations.deleteCard,
    updateCard: cardMutations.updateCard,
  }
});
