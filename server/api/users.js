const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const users = require('../models/users');
const config = require('../config');

exports.validRegister = () => [check('password', 'Минимальная длина пароля 2 символа').isLength({ min: 2 })];

exports.validAuth = () => [check('login', 'Введите логин').exists(), check('password', 'Введите пароль').exists()];

exports.register = async (req, res) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			console.error(errors);
			return res.status(400).json({
				errors: errors.array(),
				message: 'Некорректные данные при регистрации',
			});
		}

		const {
			login, password, surname, firstname, patronymic,
		} = req.body;
		const candidate = await users.getByLogin(req, res, login);

		if (candidate) {
			console.error('Пользователь с таким логином уже существует');
			return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
		}

		const hashedPassword = await bcrypt.hash(password, 1);
		const user = {
			login, password: hashedPassword, surname, firstname, patronymic,
		};

		await users.add(req, res, user);

		return res.status(200).json();
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова :${err}`,
		});
	}
};

exports.auth = async (req, res) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Некорректные данные при входе в систему',
			});
		}

		const { login, password } = req.body;
		const user = await users.getByLogin(req, res, login);

		if (!user) {
			return res.status(400).json({ message: 'Неверный логин' });
		}

		const isMath = await bcrypt.compare(password, user.password);

		if (!isMath) {
			return res.status(400).json({ message: 'Неверный логин или пароль' });
		}

		const payload = {
			id: user.id,
			login: user.login,
			password: user.password,
			admin: user.admin,
		};

		const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });

		return res.status(200).json({
			token,
		});
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.getUsers = async (req, res) => {
	try {
		const usersList = await users.getAll(req, res);
		return res.json(usersList);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.getUser = async (req, res) => {
	try {
		const user = await users.getById(req, res);
		return res.json(user);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};
