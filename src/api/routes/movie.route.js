const router = require('express').Router();

const movieController = require('@/controllers/movie.controller');
const authentication = require('@/middlewares/authentication');
const { authorization } = require('@/middlewares/authorization');

router.use(authentication);

router.get('/', authorization(['Engineer']), movieController.getMovies);
router.get('/:id', authorization(['Engineer']), movieController.getMovieById);
router.post('/', authorization(['Engineer']), movieController.createMovie);
router.put('/:id', authorization(['Engineer']), movieController.updateMovie);
router.delete('/:id', authorization(['Engineer']), movieController.deleteMovie);

module.exports = router;
