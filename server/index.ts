/** Подключение переменных окружения */
require('dotenv').config();

/** Подключение необходимых библиотек */
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

/** Указание порта, на котором будет работать веб-сервер */
const PORT = process.env.PORT || 5000;

/** Идентификация сервера */
const app = express();

/** Подключение механизма CORS */
app.use(cors());

app.use(express.json());

/** Указание директорий для хранения файлов на сервере */
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.static(path.resolve(__dirname, 'static/content')));
app.use(express.static(path.resolve(__dirname, 'static/materials')));
app.use(fileUpload({}));

app.use('/api', router);

/** Обработка ошибок, последний Middleware */
app.use(errorHandler);

/** Функция запуска сервера */
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        console.log('-----------------------------');
        app.listen(PORT, () => console.log(`Сервер запущен на порте: ${PORT}`));
        console.log('-----------------------------');
    } catch (error) {
        console.log(error);
    }
};

/** Запуск сервера */
start();
