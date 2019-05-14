const {
  GraphQLList,
  GraphQLID,
  GraphQLString,
} = require('graphql');
const type = require('./userType');
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
  },
  checkLogin: {
    type,
    args: {
      token: {
        type: GraphQLString
      }
    },
    resolve: UserController.checkLogin.bind(UserController)
  }
}
