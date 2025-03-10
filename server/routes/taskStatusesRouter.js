const Router = require('express');
const router = new Router();
const taskStatusesContoller = require('../controllers/taskStatusesController');

router.get('/getAll', taskStatusesContoller.getAll);

module.exports = router;
