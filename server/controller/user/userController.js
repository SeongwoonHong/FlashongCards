const Joi = require('joi');
const UserRepository = require('../../model/user/userRepository');
const validationUtils = require('../../utils/validation-utils');
const jwtUtils = require('../../utils/jwt-utils');
const bcryptUtils = require('../../utils/bcrpyt-utils');

class UserResponse {  
  constructor(user) {
    this.user_id = user.user_id || null ;
    this.username = user.username || null;
    this.signup_date = user.signup_date || null;
    this.token = user.token || null;
  }
}

class UserController {
  static async login(_, { username, password }) {
    // TODO: validation can be abstracted to a parent abstract class later..?
    // TODO: validation error handling as well
    try {
      const schema = Joi.object().keys({
        username: validationUtils.isUsername,
        password: validationUtils.isPassword,
      });

      const result = Joi.validate({ username, password }, schema);
  
      if (result.error) {
        throw new Error('Validation Error');
      }

      const userRes = await UserRepository.login({ username, password });

      if (userRes.success) {
        return new UserResponse(userRes);
      }
      /**
       * Todo: Handling this..? when there's an error, want to return different type??
      */
      console.log(userRes.message);
      return userRes;
    } catch (e) {
      console.log(e.message);
    }
  }

  static async getUser(_, { user_id }) {
    // TODO: validation can be abstracted to a parent abstract class later..?
    // TODO: validation error handling as well
    try {
      const userRes = await UserRepository.getById(user_id);

      if (userRes.success) {
        return new UserResponse(userRes);
      }

      console.log(userRes.message);
      return userRes;
    } catch (e) {
      console.log(e.message);
    }
  }

  static async getUsers() {
    try {
      const userRes = await UserRepository.getAllUsers();

      return userRes;
    } catch (e) {
      console.log(e.message);
    }
  }

  static async signup(_, { username, password, passwordConfirm }) {
    try {
      /**
       * checking user with username and password
       */
      const user = await UserRepository.findByFields({
        fields: {
          username,
        }
      });

      if (!user.length) {
        const userRes = await UserRepository.createUser({ username, password });

        return userRes;
      } else {
        console.log('User already exists');
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  static async checkLogin(_, __, { user }) {
    try {
      if (!user) {
        throw new Error('You are not authenticated');
      }

      return this.getUser(_, { user_id: user.user_id });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = UserController;
