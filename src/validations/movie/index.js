const { VALIDATION_ERR } = require('@/constants/errorType');
const InvariantError = require('@/exceptions/InvariantError');

const { create, update } = require('./schema');

const movieValidation = {
  validateCreatePayload: (payload) => {
    const validationResult = create.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
    }
  },
  validateUpdatePayload: (payload) => {
    const validationResult = update.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
    }
  }
};

module.exports = movieValidation;
