const MovieService = require("@/services/database/MovieService");
const { getPaginationStatus } = require("@/utils/pagination");

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
