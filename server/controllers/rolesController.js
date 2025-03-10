const { Role } = require('../models/models');

class RolesController {
    async getAll(req, res) {
        const roles = await Role.findAll();
        return res.json(roles);
    }
}

module.exports = new RolesController();
