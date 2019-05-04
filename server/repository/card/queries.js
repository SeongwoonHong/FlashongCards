const {
  GraphQLList,
  GraphQLID,
  GraphQLString,
} = require('graphql');
const type = require('./type');
const CardController = require('../../controller/card/cardController');

module.exports = {
  cards: {
    type: new GraphQLList(type),
    args: {
      user_id: {
        type: GraphQLID,
      }
    },
    resolve: CardController.getCards.bind(CardController),
  }
}
