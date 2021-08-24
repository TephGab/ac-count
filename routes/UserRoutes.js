const router = require('express').Router();
const userController = require('../controllers/UserController');
const auth = require('../middleware/Auth');

//Auth
router.post('/login', userController.login);
router.post('/signup', userController.signup);

module.exports = router;