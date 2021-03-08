const {Router} = require('express');
const bcrypt =  require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check,validationResult} = require('express-validator');
const router = Router();

/// post запрос api/register
router.post(
    '/register',
    [
        check('email','Некорректный email').isEmail(),
        check('password','Минимальная длина пароль 6 символов')
            .isLength({min: 6})
    ],
    async (req, res) => {
    try {
        console.log(req.body,'=>>> req body')
        // скармливаем то что прилетело с фронта в валидатор
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регестрации'
            })
        }
        // то что отправляется с фронта
        const {firstName, email, password} = req.body;

        // логика регестрации нового пользователя и проверки на ошибка
        // ищем в базе данных пользователя
        const candidate = await User.findOne({ email });

        // если уже есть отправляем сообщение что уже создан с таким email
        if (candidate) {
            return res.status(400).json({message: 'Такой пользователь уже существует'})
        }
        // регистрируем здесь хэшируем пароль (асинхронно)
        const hashedPassword = await bcrypt.hash(password,12);
        const user = new User({firstName, email, password: hashedPassword});

        await user.save();
        // Здесь логика такая что мы создали нового польщователя записали его в базу и тут же
        // достаем его из базы чтобы взять id и сгенерить токен
        const savedNewUser = await User.findOne({ email });

        // создаем токен передаем 3 параметра
        // первый парметр данные которые зашифрованы в jwt токен
        // второй параметр секретный ключ
        // третий параметр это число когда токен просрочиться 
        const token = jwt.sign(
            {userId: savedNewUser.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        );

        res.status(201).json(
            {
                successMessage: 'Вы успешно зарегестрировались',
                userId: savedNewUser.id,
                token
            });


    } catch (error) {
        res.status(500).json({message: "Ошибка сервера"})
    }
});

/// post запрос /api/login
router.post(
    '/login', 
    [
        check('email','Введите корректный email').normalizeEmail().isEmail(),
        check('password','Введите ваш пароль').exists(),
    ],
    async (req, res) => {
    try {
        // скармливаем то что прилетело с фронта в валидатор
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе в систему'
            })
        }
        // то что отправляется с фронта при логине
        const {email, password} = req.body;

        // логика логина пользователя и проверки на ошибка
        // ищем в базе данных пользователя
        const user = await User.findOne({email})

        // если нету тогда сразу пишем что такого пользователя нету
        if (!user) {
            return res.status(400).json({message: 'Пользователь не найден'})
        }

        /// проверяем hash паролей
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Неверный пароль,попробуйте снова'})
        }
        // создаем токен передаем 3 параметра
        // первый парметр данные которые зашифрованы в jwt токен
        // второй параметр секретный ключ
        // третий параметр это число когда токен просрочиться 
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        );

        res.status(200).json({token, userId: user.id,});

    } catch (error) {
        res.status(500).json({message: "Ошибка сервера"})
    }
})

module.exports = router;