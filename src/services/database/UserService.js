const { PrismaClient } = require("@prisma/client");

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
    });

    return user;
  }
};

module.exports = UserService;
