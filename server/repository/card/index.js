const DAO = require('../../database/dao');
const jwtUtils = require('../../utils/jwt-utils');

class Card extends DAO {

  static get TABLE_NAME() {
    return 'cards';
  }

  static get PRIMARY_KEY() {
    return 'card_id';
  }

  static async getById(card_id) {
    try {
      const card = await this.findByPrimaryKey(card_id);
  
      if (card) {
        return {
          success: true,
          ...card,
        }
      } else {
        return {
          success: false,
          message: 'Card does not exist'
        }
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getAllCards(user_id) {
    try {
      const result = await this.findByFields({ fields: { user_id } });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async createCard({ user_id, front, back, category }) {
    try {
      const insertResult = await this.insert({
        data: {
          user_id,
          front,
          back,
        }
      });

      const result = await this.getById(insertResult.insertId);

      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async deleteCard(card_id) {
    try {
      const card = await this.getById(card_id);
      const result = await this.deleteById(card_id);

      return card;
    } catch (e) {
      throw new Error(e);
    }
  }
  // TODO: Update Card
}

module.exports = Card;
