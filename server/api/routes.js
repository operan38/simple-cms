const { check, validationResult } = require('express-validator');
const routes = require('../models/routes');

exports.validRoute = () => [check('title', 'Введите заголовок').exists(), check('path', 'Введите путь').exists(), check('container_id', 'Укажите контейнер').exists()];

exports.getRoutes = async (req, res) => {
	try {
		const routesList = await routes.getAll(req, res);
		return res.json(routesList);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.getRoute = async (req, res) => {
	try {
		const route = await routes.getById(req, res);
		return res.json(route);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.addRoute = async (req, res) => {
	try {
		const route = await routes.add(req, res);
		return res.json(route);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.delRoute = async (req, res) => {
	try {
		const route = await routes.del(req, res);
		return res.json(route);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.updRoute = async (req, res) => {
	try {
		const route = await routes.upd(req, res);
		return res.json(route);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};
