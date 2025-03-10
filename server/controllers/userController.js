const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const generateJwt = (id, email, fullName, phone, role) => {
    return jwt.sign({ id, email, fullName, phone, role }, process.env.SECRET_KEY, {
        expiresIn: '24h'
    });
};

class UserController {
    async registration(req, res, next) {
        let { login, password, roleId } = req.body;

        const existUser = await User.findOne({ where: { login } });

        if (existUser) {
            return res.json({
                code: 0,
                message: 'Пользователь с таким login уже существует'
            });
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({
            login,
            password: hashPassword,
            roleId
        });
        return res.json({ user });
    }

    async login(req, res) {
        const { login, password } = req.body;
        const existUser = await User.findOne({ where: { login } });

        if (!existUser) {
            return res.json({ code: 0, message: 'Пользователь не найден' });
        }

        let comparePassword = bcrypt.compareSync(password, existUser.password);

        if (!comparePassword) {
            return res.json({ code: 0, message: 'Указан неверный пароль' });
        }

        return res.json({ ...existUser.dataValues });
    }

    async getAll(req, res) {
        const users = await User.findAll();
        return res.json(users);
    }
}

module.exports = new UserController();
