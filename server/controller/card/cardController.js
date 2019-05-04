const Joi = require('joi');
const CardRepository = require('../../repository/card');
const validationUtils = require('../../utils/validation-utils');
const jwtUtils = require('../../utils/jwt-utils');
const bcryptUtils = require('../../utils/bcrpyt-utils');

class CardController {
  static async addCard(_, { front, back, category = 1 }) { // for now, all cards are going to be category 1.
    try {
      const cardRes = await CardRepository.createCard({ user_id: 1, front, back, category }); // for now, user id is 1 hard coded

      return cardRes;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getCards(_, { user_id }) {
    try {
      const cardRes = await CardRepository.getAllCards({ user_id });

      return cardRes;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async deleteCard(_, { card_id }) {
    try {
      const cardRes = await CardRepository.deleteCard(card_id);

      return cardRes;
    } catch (e) {
      throw new Error(e);
    }
  }
  // TODO: Update Card
}

module.exports = CardController;
