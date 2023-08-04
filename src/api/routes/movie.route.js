const router = require('express').Router();

const movieController = require('@/controllers/movie.controller');
const authentication = require('@/middlewares/authentication');

router.get('/', authentication, movieController.getMovies);
router.get('/:id', authentication, movieController.getMovieById);
router.post('/', authentication, movieController.createMovie);
router.put('/:id', authentication, movieController.updateMovie);
router.delete('/:id', authentication, movieController.deleteMovie);

module.exports = router;
