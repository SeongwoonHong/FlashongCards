const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean
} = require('graphql');
const type = require('./cardType');
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
  updateCard: {
    type,
    args: {
      card_id: { type: new GraphQLNonNull(GraphQLID) },
      is_studied: { type: GraphQLBoolean },
      is_favorite: { type: GraphQLBoolean },
      front: { type: GraphQLString },
      back: { type: GraphQLString },
    },
    resolve: CardController.updateCard.bind(CardController),
  }
}
