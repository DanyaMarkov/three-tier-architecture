const { Task } = require('../models/models');

class TasksController {
    async getAll(req, res) {
        let { projectId } = req.query;
        let tasks;
        tasks = await Task.findAndCountAll({ where: { projectId } });

        return res.json(tasks);
    }

    async createTask(req, res) {
        let { name, projectId, statusId, userId } = req.body;

        const newTask = await Task.create({
            name,
            projectId,
            statusId,
            userId
        });

        return res.json({ newTask });
    }

    async deleteTask(req, res) {
        let { id } = req.query;

        let response = '';

        if (id) {
            await Task.destroy({ where: { id } });
            response = 'Удачное удаление';
        } else {
            response = 'Задача не найдена';
        }

        return res.json(response);
    }
}

module.exports = new TasksController();
