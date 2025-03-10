const { TaskStatus } = require('../models/models');

class TaskStatusesController {
    async getAll(req, res) {
        const taskStatuses = await TaskStatus.findAll();
        return res.json(taskStatuses);
    }
}

module.exports = new TaskStatusesController();
