const router = require('express').Router();

const movieController = require('@/controllers/movie.controller');
const authentication = require('@/middlewares/authentication');

router.get('/', authentication, movieController.getMovies);

module.exports = router;
