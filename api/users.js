const bcrypt = require('bcryptjs');
const config = require('../config');
const jwt = require('jsonwebtoken');

const users = require('../models/users');

const { check, validationResult } = require('express-validator');

exports.validRegister = () => {
    return [
        check('password', 'Минимальная длина пароля 2 символа').isLength({ min: 2 })
    ]
}

exports.validLogin = () => {
    return [
        check('password', 'Введите пароль').exists()
    ]
}

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const { login, password } = req.body;
        const candidate = await users.getByLogin(req, res, login);

        if (candidate.length) {
            return res.status(400).json({message: 'Пользователь с таким логином уже существует'});
        }

        const hashedPassword = await bcrypt.hash(password, 1);
        const user = { login, password: hashedPassword};

        await users.add(req, res, user);

        return res.status(201).json();
    }
    catch (err) {
        return res.status(500).json({
            message: 'Что то пошло не так, попробуйте снова :' + err
        });
    }
}

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе в систему'
            })
        }

        const { login, password } = req.body;
        const user = await users.getByLogin(req, res, login);

        if (!user.length) {
            return res.status(400).json({message: 'Неверный логин или пароль'});
        }

        const isMath = await bcrypt.compare(password, user[0].password);

        if (!isMath) {
            return res.status(400).json({message: 'Неверный логин или пароль'});
        }

        const token = jwt.sign(
            { userId: user[0].id },
            config.jwtSecret,
            { expiresIn: '1h'}
        )

        return res.status(200).json({ token, userId: user[0].id});
    }
    catch (err) {
        return res.status(500).json({
            message: 'Что то пошло не так, попробуйте снова: ' + err
        });
    }
}