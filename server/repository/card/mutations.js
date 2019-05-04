const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql');
const type = require('./type');
const CardController = require('../../controller/card/cardController');

module.exports = {
  addCard: {
    type,
    args: {
      user_id: { type: new GraphQLNonNull(GraphQLID) },
      front: { type: new GraphQLNonNull(GraphQLString) },
      back: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: CardController.addCard.bind(CardController),
  },
  deleteCard: {
    type,
    args: {
      card_id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: CardController.deleteCard.bind(CardController),
  },
}
