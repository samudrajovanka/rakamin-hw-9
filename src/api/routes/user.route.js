const router = require('express').Router();

const userController = require('@/controllers/user.controller');
const authentication = require('@/middlewares/authentication');

router.get('/', authentication, userController.getUsers);

module.exports = router;
