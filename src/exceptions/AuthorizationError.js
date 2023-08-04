const { AUTHORIZATION_ERR_MSG } = require('@/constants/errorMessage');
const { AUTHORIZATION_ERR } = require('@/constants/errorType');

const ClientError = require('./ClientError');

class AuthorizationError extends ClientError {
  name;

  constructor(message = AUTHORIZATION_ERR_MSG, type = AUTHORIZATION_ERR) {
    super(message, type, 401);
    this.name = 'Authorization Error';
  }
}

module.exports = AuthorizationError;
