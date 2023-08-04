const MovieService = require("@/services/database/MovieService");
const { getPaginationStatus } = require("@/utils/pagination");
const movieValidation = require("@/validations/movie");

exports.getMovies = async (req, res, next) => {
  try {
    const movieService = new MovieService();

    const { page = 1, limit = 10 } = req.query;

    const { originalTotal, movies } = await movieService.getMovies({
      page: parseInt(page),
      limit: parseInt(limit)
    });

    return res.status(200).json({
      success: true,
      message: "Get movies success",
      data: {
        pagination: getPaginationStatus(parseInt(page), parseInt(limit), originalTotal),
        movies
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getMovieById = async (req, res, next) => {
  try {
    const movieService = new MovieService();

    const { id } = req.params;

    const movie = await movieService.getMovieById(parseInt(id));

    return res.status(200).json({
      success: true,
      message: "Get movie success",
      data: {
        movie
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    movieValidation.validateCreatePayload(req.body);

    const movieService = new MovieService();

    const movie = await movieService.createMovie(req.body);

    return res.status(201).json({
      success: true,
      message: "Create movie success",
      data: {
        movie
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.updateMovie = async (req, res, next) => {
  try {
    movieValidation.validateUpdatePayload(req.body);

    const movieService = new MovieService();

    const { id } = req.params;

    const movie = await movieService.updateMovie(parseInt(id), req.body);

    return res.status(200).json({
      success: true,
      message: "Update movie success",
      data: {
        movie
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const movieService = new MovieService();

    const { id } = req.params;

    await movieService.deleteMovie(parseInt(id));

    return res.status(200).json({
      success: true,
      message: "Delete movie success"
    });
  } catch (error) {
    next(error);
  }
};
