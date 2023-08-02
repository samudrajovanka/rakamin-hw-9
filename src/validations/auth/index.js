const { VALIDATION_ERR } = require('@/constants/errorType');
const InvariantError = require('@/exceptions/InvariantError');

const {
  register, login
} = require('./schema');

const authValidation = {
  validateRegisterPayload: (payload) => {
    const validationResult = register.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
    }
  },
  validateLoginPayload: (payload) => {
    const validationResult = login.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
    }
  }
};

module.exports = authValidation;
