const Joi = require('joi');
const CardRepository = require('../../model/card/cardRepository');
const validationUtils = require('../../utils/validation-utils');
const jwtUtils = require('../../utils/jwt-utils');
const bcryptUtils = require('../../utils/bcrpyt-utils');

class CardController {
  static async addCard(_, { user_id, front, back, category = 1 }) { // for now, all cards are going to be category 1.
    try {
      const cardRes = await CardRepository.createCard({ user_id, front, back, category });

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
  static async updateCard(_, { card_id, is_studied, is_favorite }, { user }) {
    try {
      if (!user) {
        throw new Error('Not authenticated');
      }

      const cardRes = await CardRepository.updateCard({ card_id, is_studied, is_favorite });

      return cardRes;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = CardController;
