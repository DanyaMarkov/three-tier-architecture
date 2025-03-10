const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const rolesRouter = require('./rolesRouter');
const projectsRouter = require('./projectsRouter');
const tasksRouter = require('./tasksRouter');
const taskStatusesRouter = require('./taskStatusesRouter');

router.use('/users', userRouter);
router.use('/roles', rolesRouter);
router.use('/projects', projectsRouter);
router.use('/tasks', tasksRouter);
router.use('/taskStatuses', taskStatusesRouter);

module.exports = router;
