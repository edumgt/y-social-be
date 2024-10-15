const { ERRORS } = require("../../constants/error");

class IAds {
  async create(adData) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: create(adData) method is not implemented.`,
      adData,
    );
  }

  async findById(id) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: findById(id) method is not implemented.`,
      id,
    );
  }

  async update(id, adData) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: update(id, adData) method is not implemented.`,
      id,
      adData,
    );
  }

  async delete(id) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: delete(id) method is not implemented.`,
      id,
    );
  }

  async findAll() {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: findAll() method is not implemented.`,
    );
  }

  async findByUser(userId) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: findByUser(userId) method is not implemented.`,
      userId,
    );
  }

  async deleteAllByUser(userId) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: deleteAllByUser(userId) method is not implemented.`,
      userId,
    );
  }

  async findTrending() {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: findTrending() method is not implemented.`,
    );
  }

  calculateAdsScore(ad) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: calculateAdsScore(ad) method is not implemented.`,
      ad,
    );
  }
}

module.exports = { IAds };
