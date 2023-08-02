const AuthenticationError = require('@/exceptions/AuthenticationError');
const UserService = require('@/services/database/UserService');
const { decodeToken } = require('@/utils/tokenManager');

const authentication = async (req, res, next) => {
  try {
    const bearerToken = req.headers?.authorization;

    if (!bearerToken) {
      throw new AuthenticationError()
    }

    const token = bearerToken.split(' ')[1];

    const { id } = await decodeToken(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const userService = new UserService();
    const user = await userService.getUserById(id);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
