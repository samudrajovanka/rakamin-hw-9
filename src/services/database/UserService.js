const { PrismaClient, Prisma } = require("@prisma/client");

const NotFoundError = require('@/exceptions/NotFoundError');
const InvariantError = require('@/exceptions/InvariantError');
const { EMAIL_ALREADY_USED_ERR_MSG } = require("@/constants/errorMessage");
const { CONFLICT_ERR } = require("@/constants/errorType");

const prisma = new PrismaClient();

class UserService {
  async getUsers({ page, limit } = { page: 1, limit: 10 }) {
    const originalTotal = await prisma.users.count();

    const users = await prisma.users.findMany({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        email: true,
        gender: true,
        role: true
      }
    });

    return {
      originalTotal,
      users
    };
  }

  async getUserById(id) {
    const user = await prisma.users.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        email: true,
        gender: true,
        role: true
      }
    });

    return user;
  }

  async updateUserById(id, { email, gender, role }) {
    try {
      const user = await prisma.users.update({
        where: {
          id
        },
        data: {
          email,
          gender,
          role
        },
        select: {
          id: true,
          email: true,
          gender: true,
          role: true
        }
      });

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError('User not found');
        } else if (error.code === 'P2002') {
          throw new InvariantError(EMAIL_ALREADY_USED_ERR_MSG, CONFLICT_ERR, 409);
        }
      }

      throw error;
    }
  }

  async deleteUserById(id) {
    try {
      await prisma.users.delete({
        where: {
          id
        }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError('User not found');
        }
      }

      throw error;
    }
  }
};

module.exports = UserService;
