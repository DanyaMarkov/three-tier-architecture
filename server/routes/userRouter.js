const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/registration', userController.registration);
router.get('/getAll', userController.getAll);

module.exports = router;
