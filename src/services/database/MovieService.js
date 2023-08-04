const { PrismaClient, Prisma } = require("@prisma/client");

const NotFoundError = require("@/exceptions/NotFoundError");
const { randomNumberId } = require('@/utils/common');

const prisma = new PrismaClient();

class MovieService {
  async getMovies({ page, limit } = { page: 1, limit: 10 }) {
    const originalTotal = await prisma.movies.count();

    const movies = await prisma.movies.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    const moviesMapping = movies.map((movie) => ({
      ...movie,
      genres: movie.genres.split('|'),
    }));

    return {
      originalTotal,
      movies: moviesMapping
    };
  }

  async getMovieById(id) {
    const movie = await prisma.movies.findUnique({
      where: {
        id,
      },
    });

    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    const movieMapping = {
      ...movie,
      genres: movie.genres.split('|'),
    };

    return movieMapping;
  }

  async createMovie({ title, genres, year }) {
    const movie = await prisma.movies.create({
      data: {
        id: randomNumberId(),
        title,
        genres: genres.join('|'),
        year,
      },
    });

    return movie;
  }

  async updateMovie(id, { title, genres, year }) {
    try {
      const movie = await prisma.movies.update({
        where: {
          id,
        },
        data: {
          title,
          genres: genres.join('|'),
          year,
        },
      });

      return movie;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError('Movie not found');
        }
      }

      throw error;
    }
  }

  async deleteMovie(id) {
    try {
      await prisma.movies.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError('Movie not found');
        }
      }

      throw error;
    }
  }
};

module.exports = MovieService;
