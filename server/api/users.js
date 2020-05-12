const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const fs = require('fs');

const usersModel = require('../models/users');
const config = require('../config');

exports.validRegister = () => [
	check('login', 'Введите логин').exists(),
	check('password', 'Введите пароль').exists(),
	check('login', 'Минимальная длина логина 3 символа').isLength({ min: 3 }),
	check('password', 'Минимальная длина пароля 2 символа').isLength({ min: 2 })];

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
		const candidate = await usersModel.getByLogin(req, res, login);

		if (candidate) {
			console.error('Пользователь с таким логином уже существует');
			return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
		}

		const hashedPassword = await bcrypt.hash(password, 1);
		const user = {
			login, password: hashedPassword, surname, firstname, patronymic,
		};

		await usersModel.add(req, res, user);

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

		// console.log('body', login);

		const user = await usersModel.getByLogin(req, res, login);

		// console.log('user', user);

		if (!user) {
			return res.status(400).json({ message: 'Неверный логин или пароль' });
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
			main_photo: user.main_photo,
		};

		const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });

		return res.status(200).json({
			userId: user.id,
			token,
		});
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.checkoutToken = (req, res) => {
	const { token, userId } = req.body;

	jwt.verify(token, config.jwtSecret, (err) => {
		if (err) throw err;

		// Если такой пользователь сущестувет
		// const id = users.getById(req, res, userId);

		// Вернуть токен
		res.json({
			userId,
			token,
		});
	});
};

exports.changePassword = async (req, res) => {

};

exports.changeFIO = async (req, res) => {
	try {
		const user = {
			...req.body,
		};
		const result = await usersModel.updFIO(req, res, user);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.getUsers = async (req, res) => {
	try {
		const result = await usersModel.getAll(req, res);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.getUser = async (req, res) => {
	try {
		const user = {
			id: req.body.id || req.params.id,
		};
		const result = await usersModel.getById(req, res, user);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.uploadPhoto = async (req, res, next) => {
	const url = `${req.protocol}://${req.get('host')}`;

	const user = {
		id: req.body.id,
		main_photo: `/uploads/${req.file.filename}`,
	};

	const resulst = await usersModel.updMainPhoto(req, res, user);
	return res.send(resulst);
};

exports.delPhoto = (req, res, next) => {
	fs.stat('./uploads/21e104e4-76fa-4929-9bc5-7858980a5777-4.png', (err, stats) => {
		console.log(stats);// here we got all information of file in stats variable

		if (err) {
			res.json(err);
		} else {
			fs.unlink('./uploads/21e104e4-76fa-4929-9bc5-7858980a5777-4.png', (errLink) => {
				if (errLink) return res.json(errLink);
				console.log('file deleted successfully');
				return res.json('file deleted successfully');
			});
		}
	});
};
