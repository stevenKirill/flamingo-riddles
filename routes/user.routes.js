const {Router} = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const updateUser = require('../middleware/user.update.data.middleware');
const router = Router();
const countryList = require('../other_data/countries');

// post на получение данных о пользователе
router.get('/user-data', async (req, res) => {
    try {
        const userId = req.headers.auth.split(' ')[1];
        if (!userId) {
            return res.status(401).json({message: 'Нет авторизации'});
        };
        const currentUser = await User.findById(userId);
        const dataToSend = {};

        if (currentUser.firstName) {
            dataToSend.firstName = currentUser.firstName;
        };
    
        if (currentUser.gender) {
            dataToSend.gender = currentUser.gender
        };
    
        if(currentUser.hobbies) {
            dataToSend.hobbies = currentUser.hobbies;
        };
    
        if (currentUser.country) {
            dataToSend.country = currentUser.country;
        };
        
        if (currentUser.favouriteRiddles) {
            dataToSend.favouriteRiddles = currentUser.favouriteRiddles
        }
        res.status(201).json({...dataToSend});
    } catch (error) {
        res.status(500).json({message: "Ошибка сервера"})
    }
})

/// post на изменения данных пользовательской формы
router.post('/edit', async (req,res) => {
    try {
        const userId = req.headers.auth.split(' ')[1];
        const {firstName, gender, country, hobbies} = req.body;
        if (!userId) {
            return res.status(401).json({message: 'Нет авторизации'});
        };
        const currentUser = await User.findById(userId);
        if (firstName && firstName !== '') {
            currentUser.firstName = firstName;
        }
        if (gender && gender !== '') {
            currentUser.gender = gender
        }
        if (country && country !== '' && countryList.includes(country)) {
            currentUser.country = country;
        }

        if (hobbies && hobbies !== '') {
            currentUser.hobbies = hobbies;
        }
        await currentUser.save()
        const userData = {
            firstName: currentUser.firstName,
            country: currentUser.country,
            gender: currentUser.gender,
            hobbies: currentUser.hobbies,
            favouriteRiddles: currentUser.favouriteRiddles,
        }
        res.status(201).json({userData, success: 'Данные успешно изменены'})
    } catch (error) {
        res.status(500).json({message: "Ошибка сервера"})
    }
});

module.exports = router;