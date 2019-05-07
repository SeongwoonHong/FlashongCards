const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');
const type = require('./type');
const UserController = require('../../controller/user/userController');

module.exports = {
  signup: {
    type,
    args: {
      username: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      passwordConfirm: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: UserController.signup.bind(UserController),
  },
  login: {
    type,
    args: {
      username: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: UserController.login.bind(UserController),
  }
}
