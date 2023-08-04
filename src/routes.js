const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const path = require("path");
const YAML = require('yaml');

const authRoute = require('@/routes/auth.route');
const movieRoute = require('@/routes/movie.route');
const userRoute = require('@/routes/user.route');

/**
 * swagger docs
 */
const swaggerUiOptions = {
  explorer: true
};
const file  = fs.readFileSync(path.join(__dirname, '..', '/docs/swagger.yaml'), 'utf8')
const swaggerDocument = YAML.parse(file)
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument, swaggerUiOptions));

/**
 * api routes
 */
router.use('/api/auth', authRoute);
router.use('/api/movies', movieRoute);
router.use('/api/users', userRoute);

module.exports = router;
