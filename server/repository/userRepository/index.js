const BaseRepository = require('../baseRepository');
const jwtUtils = require('../../utils/jwt-utils');

class UserRepository extends BaseRepository {

  static get TABLE_NAME() {
    return 'users';
  }

  static get PRIMARY_KEY() {
    return 'user_id';
  }

  // parameter user_id should be a primary key
  static async getById(user_id) {
    try {
      const user = await this.findByPrimaryKey(user_id);
  
      if (user) {
        return {
          success: true,
          ...user,
        }
      } else {
        return {
          success: false,
          message: 'User does not exist'
        }
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getAllUsers() {
    try {
      return await this.findAll();
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getUser(username) {
    try {
      const result = await this.findByFields({ fields: { username } });
  
      if (result.length) {
        return {
          ...result[0],
          success: true,
        }
      } else {
        return {
          success: false,
        }
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  static async createUser({ username, password }) {
    try {
      const insertResult = await this.insert({
        data: {
          username,
          password,
        }
      });

      const result = await this.getById(insertResult.insertId);

      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async login({ username, password }) {
    try {
      /**
       * checking user with username and password
       */
      const user = await this.findByFields({
        fields: {
          username,
          password
        }
      });

      if (user.length) {
        /**
         * If the user exists on the database, create a token and return it
         */
        const token = await jwtUtils.createToken({
          username,
          password
        });

        return {
          token,
          ...user[0],
          success: true,
        }
      } else {
        /**
         * If there's no user matched on the database, return a message
         */
        return {
          success: false,
          message: 'Incorrect Credentials'
        }
      }
    } catch (e) {
      throw new Error(e);
    }
  }

}

module.exports = UserRepository;
