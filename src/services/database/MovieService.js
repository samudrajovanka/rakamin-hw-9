const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class MovieService {
  async getMovies({ page, limit } = { page: 1, limit: 10 }) {
    const originalTotal = await prisma.movies.count();

    const movies = await prisma.movies.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      originalTotal,
      movies
    };
  }
};

module.exports = MovieService;
