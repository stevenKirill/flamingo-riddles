const {Router} = require('express');
const Riddle = require('../models/Riddle');
const SuggestedRiddle = require('../models/SuggestedRiddle');
const User = require('../models/User');
const router = new Router();


// post запрос на категорию легкие задачи (вообще по идее это должен быть GET, но в GET нельзя передавать body)
router.post('/easy', async (req,res) => {
    try {
        // логика для первых 10 для первой страницы нужен middleware для пагинации
        // в прилложении будет пагинация на одной странице 10 загадок
        const page = req.query.page;
        const easyRiddles = await Riddle.find({category: 'easy'});
        if (!easyRiddles) {
            res.json({message: 'Не удалось загрузить данные'})
            return;
        }
        const easyRiddlesArray = [...easyRiddles];
        let tenRiddles;
        switch(page) {
            case "1":
                tenRiddles = easyRiddlesArray.slice(0,9);
                return res.json(tenRiddles);
            case "2":
                tenRiddles = easyRiddlesArray.slice(10,20);
                return res.json(tenRiddles);
            case "3":
                tenRiddles = easyRiddlesArray.slice(20,30);
                return res.json(tenRiddles);
            case "4":
                tenRiddles = easyRiddlesArray.slice(30,40);
                return res.json(tenRiddles);
            case "5":
                tenRiddles = easyRiddlesArray.slice(40,50);
                return res.json(tenRiddles);
            case "6":
                tenRiddles = easyRiddlesArray.slice(50,60);
                return res.json(tenRiddles);
            case "7":
                tenRiddles = easyRiddlesArray.slice(60,70);
                return res.json(tenRiddles);
            case "8":
                tenRiddles = easyRiddlesArray.slice(70);
                return res.json(tenRiddles);
            default:
                return easyRiddles;
        }
    } catch (error) {
        res.status(500).json({message: "Ошибка сервера"})
    }
});

// post запрос на категорию средние задачи 
router.post('/medium', async (req,res) => {
    try {
        const page = req.query.page;
        const mediumRiddles = await Riddle.find({category: 'medium'});
        if (!mediumRiddles) {
            res.json({message: 'Не удалось загрузить данные'})
            return;
        }
        const middleRiddlesArray = [...mediumRiddles];
        let tenRiddles;
        switch(page) {
            case "1":
                tenRiddles = middleRiddlesArray.slice(0,9);
                return res.json(tenRiddles);
            case "2":
                tenRiddles = middleRiddlesArray.slice(10,20);
                return res.json(tenRiddles);
            case "3":
                tenRiddles = middleRiddlesArray.slice(20,30);
                return res.json(tenRiddles);
            case "4":
                tenRiddles = middleRiddlesArray.slice(30,40);
                return res.json(tenRiddles);
            case "5":
                tenRiddles = middleRiddlesArray.slice(40,50);
                return res.json(tenRiddles);
            case "6":
                tenRiddles = middleRiddlesArray.slice(50);
                return res.json(tenRiddles);
            default:
                return middleRiddles;
        }
    } catch (error) {
        res.status(500).json({message: "Ошибка сервера"})
    }
});


// post запрос на категорию сложные задачи 
router.post('/hard', async (req,res) => {
    try {
        const page = req.query.page;
        const hardRiddles = await Riddle.find({category: 'hard'});
        if (!hardRiddles) {
            res.json({message: 'Не удалось загрузить данные'})
            return;
        }
        const hardRiddlesArray = [...hardRiddles];
        let tenRiddles;
        switch(page) {
            case "1":
                tenRiddles = hardRiddlesArray.slice(0,9);
                return res.json(tenRiddles);
            case "2":
                tenRiddles = hardRiddlesArray.slice(10,20);
                return res.json(tenRiddles);
            case "3":
                tenRiddles = hardRiddlesArray.slice(20,30);
                return res.json(tenRiddles);
            case "4":
                tenRiddles = hardRiddlesArray.slice(30);
                return res.json(tenRiddles);
            default:
                return hardRiddlesArray;
        }
    } catch (error) {
        res.status(500).json({message: "Ошибка сервера"})
    }
});

// post запрос на сохранение задачи в любимые 
router.post('/save-riddle', async (req,res) => {
    try {
        // здесь логика такая что если задача уже была добавлена тогда мы отправляем
        // сообщение о том что задача уже была добавлена ранее
        // если нет тогда мы добавляем задачу к пользователю и сохраняем 
        const userId = req.headers.id;
        const riddleId = req.headers.riddle;
        const foundUser = await User.findById(userId);
        const foundRiddle = await Riddle.findOne({id: riddleId});
        const {favouriteRiddles} = foundUser;
        const wasAddedBefore = favouriteRiddles.find(riddle => riddle.id === riddleId);
        if (wasAddedBefore) {
            return res.status(418).json({message: "Задача уже была добавлена в избранные"})
        } else {
            foundUser.favouriteRiddles.push(foundRiddle);
            await foundUser.save();
            return res.status(200).json({message: 'Задача была успешна сохранена'})
        }
    } catch (error) {
        res.status(500).json({message: "Ошибка сервера"})
    }
});

// delete запрос на категорию сложные задачи 
router.delete('/delete-riddle', async (req,res) => {
    try {
        const userId = req.headers.auth.split(' ')[1];
        const riddleId = req.headers.riddleid;
        const foundUser = await User.findById(userId);
        if (foundUser.favouriteRiddles && foundUser.favouriteRiddles.length !== 0) {
            const filteredRiddles = foundUser.favouriteRiddles.filter(riddle => riddle.id !== riddleId);
            foundUser.favouriteRiddles = filteredRiddles;
            await foundUser.save();
        }
        return res.status(200).json(
            {
            favouriteRiddles: foundUser.favouriteRiddles, 
            successMessage: 'Задача была удалена из избранных'
        });
    } catch (error) {
        res.status(500).json({message: "Ошибка сервера"})
    }
});

// post запрос на создание новой задачи от пользователя
router.post('/create-new-riddle', async (req,res) => {
    try {
        const HOURS = 24;
        const newRiddleData = req.body;
        const userId = req.headers.userid;
        const {header, description, category, answer} = newRiddleData;
        const candidate = await SuggestedRiddle.findOne({ header });
        if (candidate) {
            return res.status(400).json({message: 'Задача с таким именем уже существует'});
        };
        // проверка что последняя задача была предложена более 24 часов назад
        const now = Date.now()
        const prevAdded = await SuggestedRiddle.find({userId});
        const timestamps = prevAdded
                        .map(riddle => new Date(riddle.date).getTime())
                        .sort((a,b) => a - b);
        const lastTime = timestamps[timestamps.length - 1];
        const diff = ((now - lastTime)  / (60 * 1000) / 60).toFixed(2);
        if (diff < HOURS) {
            return res.status(403).json({
                message: 'Вы уже отправляли задачу в последние 24 часа. Пользователь может предлагать только 1 задачу в каждые 24 часа'
            });
        } else {
            const newRiddle = new SuggestedRiddle({
                header, 
                description,
                category,
                answer,
                userId,
                date: new Date()
        });
            await newRiddle.save();
            // создание новой задачи в отдельную коллекцию
            return res.status(202).json({message: 'Задача была отправлена'});
        };
    } catch (error) {
        res.status(500).json({message: "Ошибка сервера"})
    }
});

module.exports = router;