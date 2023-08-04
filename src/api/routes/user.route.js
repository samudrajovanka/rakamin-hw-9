const router = require('express').Router();

const userController = require('@/controllers/user.controller');
const authentication = require('@/middlewares/authentication');
const { authorization } = require('@/middlewares/authorization');

router.use(authentication);

router.get('/', authorization(['Engineer']), userController.getUsers);
router.get('/me', userController.getMe);
router.put('/me', userController.updateMe);
router.delete('/me', userController.deleteMe);

module.exports = router;
