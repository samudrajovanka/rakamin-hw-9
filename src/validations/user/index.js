const { VALIDATION_ERR } = require('@/constants/errorType');
const InvariantError = require('@/exceptions/InvariantError');

const { update } = require('./schema');

const userValidation = {
  validateUpdatePayload: (payload) => {
    const validationResult = update.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
    }
  }
};

module.exports = userValidation;
