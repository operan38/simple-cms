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

const generateToken = (user) => {
	const payload = {
		id: user.id,
		login: user.login,
		password: user.password,
		surname: user.surname,
		firstname: user.firstname,
		patronymic: user.patronymic,
		admin: user.admin,
		main_photo: user.main_photo,
	};

	return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
};

const refreshToken = (req, res, userId, token) => {
	jwt.verify(token, config.jwtSecret, async (err) => {
		if (err) throw err;

		// Если такой пользователь сущестувет
		const user = await usersModel.getById({ id: userId });

		if (user.length !== 0) {
			const newToken = generateToken(user[0]);

			// Обновить и вернуть новый токен
			if (newToken) {
				res.json({
					userId,
					token: newToken,
				});
			}
		}

		return res.status(400).json({
			message: `Not found id=${user.id}`,
		});
	});
};

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

		const resultCandidate = await usersModel.getByLogin(login);

		if (resultCandidate[0]) {
			console.error('Пользователь с таким логином уже существует');
			return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
		}

		const hashedPassword = await bcrypt.hash(password, 1);

		const user = {
			login,
			password: hashedPassword,
			surname,
			firstname,
			patronymic,
		};

		const result = await usersModel.add(user);

		return res.status(200).json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
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

		const result = await usersModel.getByLogin(login);
		const user = result[0];

		if (!user) {
			return res.status(400).json({ message: 'Неверный логин или пароль' });
		}

		const isMath = await bcrypt.compare(password, user.password);

		if (!isMath) {
			return res.status(400).json({ message: 'Неверный логин или пароль' });
		}

		const token = generateToken(user);

		return res.status(200).json({
			userId: user.id,
			token,
		});
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
		});
	}
};

exports.checkoutToken = (req, res) => {
	const { token, userId } = req.body;

	refreshToken(req, res, userId, token);
};

exports.changePassword = async (req, res) => {
	const {
		token, userId, oldPassword, newPassword,
	} = req.body;

	if (newPassword === oldPassword) {
		return res.status(400).json({ message: 'Старый пароль не должен совпадать с новым' });
	}

	const user = await usersModel.getById({ id: userId });

	if (user.length !== 0) {
		const hashedNewPassword = await bcrypt.hash(newPassword, 1);
		const hashedOldPassword = await bcrypt.hash(oldPassword, 1);

		if (user[0].password === hashedOldPassword) {
			const result = await usersModel.updPassword({ userId, hashedNewPassword });

			if (result) {
				return res.status(200).json({ message: 'Пароль успешно изменен' });
			}

			return res.status(400).json({ message: result });
		}

		console.log(user[0].password);
		console.log(hashedOldPassword);

		return res.status(400).json({ message: 'Старый пароль указан неверно' });
	}

	return res.status(400).json({ message: 'Пользователь не найден' });
};

exports.changeFIO = async (req, res) => {
	try {
		const user = {
			id: req.body.id,
			surname: req.body.surname,
			firstname: req.body.firstname,
			patronymic: req.body.patronymic,
			token: req.body.token,
		};
		await usersModel.updFIO(user);

		return res.json({
			message: 'Данные успешно обновлены',
		});
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
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
		const result = await usersModel.getById(user);

		if (result.length !== 0) {
			return res.json(result[0]);
		}

		return res.status(400).json({
			message: `Not found id=${user.id}`,
		});
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.uploadPhoto = async (req, res) => {
	const user = {
		id: req.body.id,
	};

	const resultId = await usersModel.getById({ id: user.id });

	if (resultId[0].main_photo) {
		const fileDel = await delFile(resultId[0].main_photo);
		console.log('fileDel', fileDel);
		console.log('main_photo', resultId[0].main_photo);
	}

	const fileUpload = new Resize(50, 50, '.jpg');
	const filename = await fileUpload.save(req.file.buffer);

	user.main_photo = `/uploads/${filename}`;

	await usersModel.updMainPhoto(user);

	return res.status(200).json({
		message: 'Фото загружено',
	});
};
