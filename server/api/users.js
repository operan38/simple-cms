const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');


const Resize = require('../libs/file/Resize');
const { delFile } = require('../libs/file/uploads');

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
	const {
		token, userId, oldPassword, newPassword,
	} = req.body;

	jwt.verify(token, config.jwtSecret, (err, user) => {
		if (err) throw err;
	});
};

exports.changeFIO = async (req, res) => {
	try {
		const user = {
			surname: req.body.surname,
			firstname: req.body.firstname,
			patronymic: req.body.patronymic,
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
		const { admin } = req.user;
		if (admin === 0) {
			return res.status(403).json({
				message: 'Доступ запрещен',
			});
		}

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
	/* const fileDel = await delFile();
	console.log('fileDel:', fileDel); */

	const fileUpload = new Resize(50, 50);
	const filename = await fileUpload.save(req.file.buffer);

	// const url = `${req.protocol}://${req.get('host')}`;

	const user = {
		id: req.body.id,
		main_photo: `/uploads/${filename}`,
	};

	const resulst = await usersModel.updMainPhoto(req, res, user);
	return res.json(resulst);
};

exports.delPhoto = (req, res, next) => {
	const result = delFile(req, res, '6af49ada-dcf8-4e49-9dac-319800069103-typo_berlin_2008_img_logo-575x575.png');
	return res.json(result);
};
