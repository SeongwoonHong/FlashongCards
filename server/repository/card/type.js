const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'CardType',
  fields: {
    card_id: {
      type: GraphQLID,
    },
    user_id: {
      type: GraphQLID,
    },
    front: {
      type: GraphQLString,
    },
    back: {
      type: GraphQLString,
    },
    category: {
      type: GraphQLInt,
    },
    /**
     * Todo: signup date type should be date type not string
     */
    creation_date: {
      type: GraphQLString,
    },
    modification_date: {
      type: GraphQLString,
    },
    is_studied: {
      type: GraphQLBoolean,
    },
    is_favorite: {
      type: GraphQLBoolean,
    }
  }
});
