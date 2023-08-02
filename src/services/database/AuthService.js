const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const { randomNumberId } = require('@/utils/common');
const AuthenticationError = require('@/exceptions/AuthenticationError');
const { createToken } = require('../../utils/tokenManager');

const prisma = new PrismaClient();

class AuthService {
  #SALT = 10;

  async register({ email, password, gender, role }) {
    const passwordHash = await bcrypt.hash(password, this.#SALT);

    const user = await prisma.users.create({
      data: {
        id: randomNumberId(),
        email,
        gender,
        password: passwordHash,
        role
      }
    });

    return user;
  }

  async login({ email, password }) {
    const user = await prisma.users.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new AuthenticationError('Email or password is wrong');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new AuthenticationError('Email or password is wrong');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = createToken({
      payload,
      secret: process.env.ACCESS_TOKEN_SECRET,
      options: { expiresIn: '1d' }
    });

    return `Bearer ` + accessToken;
  }
}

module.exports = AuthService;
