const {
  GraphQLList,
  GraphQLID,
  GraphQLString,
} = require('graphql');
const type = require('./type');
const UserController = require('../../controller/user/userController');

module.exports = {
  user: {
    type,
    args: {
      user_id: {
        type: GraphQLID
      }
    },
    resolve: UserController.getUser.bind(UserController),
  },
  users: {
    type: new GraphQLList(type),
    resolve: UserController.getUsers.bind(UserController),
  }
}
