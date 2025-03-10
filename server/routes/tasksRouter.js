const Router = require('express');
const router = new Router();
const tasksController = require('../controllers/tasksController');

router.get('/getAll', tasksController.getAll);
router.post('/createTask', tasksController.createTask);
router.delete('/', tasksController.deleteTask);

module.exports = router;
