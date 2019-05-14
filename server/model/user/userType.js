const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    user_id: {
      type: GraphQLID,
    },
    username: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    /**
     * Todo: signup date type should be date type not string
     */
    signup_date: {
      type: GraphQLString,
    },
    modification_date: {
      type: GraphQLString,
    },
    token: {
      type: GraphQLString,
    }
  }
});
