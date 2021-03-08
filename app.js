const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// зарегестрировать определенные роуты, которые будут по разному обрабатывать 

// api запросы с фронтенда
app.use(cors());

// для корректного парсинга стримов с фронтенда
app.use(express.json({extended: true}));
app.use('/api',require('./routes/auth.routes.js'));
app.use('/api',require('./routes/riddles.routes'));
app.use('/api',require('./routes/user.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname,'client','build')));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
};

const PORT = config.get('port') || 5000;

/// подключение к базе данных
async function start() {
    try {
        // подключаемся к монго
         await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
         })
         // стартуем сервер
         // валидная строка внизу
         // "mongodb+srv://steven:kirill1505@cluster0.kdgyb.mongodb.net/<dbname>?retryWrites=true&w=majority"
        app.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`)
})
    } catch (error) {
        console.log(`Ошибка сервера ${error.message}`)
        // завершить процесс если что то пошло не так
        process.exit(1)
    }
}

start();