const Router = require('express');
const router = new Router();
const projectsController = require('../controllers/projectsController');

router.get('/getAll', projectsController.getAll);
router.post('/createProject', projectsController.createProject);

module.exports = router;
