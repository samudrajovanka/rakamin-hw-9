const router = require('express').Router();

const userController = require('@/controllers/user.controller');
const authentication = require('@/middlewares/authentication');

router.get('/', authentication, userController.getUsers);
router.get('/me', authentication, userController.getMe);
router.put('/me', authentication, userController.updateMe);
router.delete('/me', authentication, userController.deleteMe);

module.exports = router;
