const { check, validationResult } = require('express-validator');
const routesModel = require('../models/routes');

exports.validRoute = () => [check('title', 'Введите заголовок').exists(), check('path', 'Введите путь').exists(), check('container_id', 'Укажите контейнер').exists()];

exports.getRoutes = async (req, res) => {
	try {
		const result = await routesModel.getAll(req, res);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.getRoute = async (req, res) => {
	try {
		const route = {
			id: req.params.id,
		};
		const result = await routesModel.getById(req, res, route);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.addRoute = async (req, res) => {
	try {
		const route = {
			title: req.body.title,
			path: req.body.path,
			container_id: req.body.container_id,
		};
		const result = await routesModel.add(req, res, route);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.delRoute = async (req, res) => {
	try {
		const route = {
			id: req.body.id,
		};
		const result = await routesModel.del(req, res, route);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.updRoute = async (req, res) => {
	try {
		const route = {
			id: req.body.id,
			title: req.body.title,
			path: req.body.path,
			container_id: req.body.container_id,
		};
		const result = await routesModel.upd(req, res, route);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};
