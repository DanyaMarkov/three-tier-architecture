const { Project } = require('../models/models');

class ProjectsController {
    async getAll(req, res) {
        const projects = await Project.findAll();
        return res.json(projects);
    }

    async createProject(req, res) {
        let { name, description } = req.body;

        const newProject = await Project.create({
            name,
            description
        });

        return res.json({ newProject });
    }
}

module.exports = new ProjectsController();
