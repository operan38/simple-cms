const { check, validationResult } = require('express-validator');
const routesModel = require('../models/routes');

exports.validRoute = () => [check('title', 'Введите заголовок').exists(), check('path', 'Введите путь').exists(), check('container_id', 'Укажите контейнер').exists()];

exports.getRoutes = async (req, res) => {
	try {
		const result = await routesModel.getAll();
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
		});
	}
};

exports.getRoute = async (req, res) => {
	try {
		const route = {
			id: req.params.id,
		};

		const result = await routesModel.getById(route);

		if (result.length !== 0) {
			return res.json(result[0]);
		}

		return res.status(400).json({
			message: `Not found id=${route.id}`,
		});
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
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
		const result = await routesModel.add(route);

		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
		});
	}
};

exports.delRoute = async (req, res) => {
	try {
		const route = {
			id: req.body.id,
		};

		const result = await routesModel.del(route);

		if (route.id) {
			return res.json(result);
		}

		return res.status(400).json({
			message: 'Not found id',
		});
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
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

		const result = await routesModel.upd(route);

		if (route.id) {
			return res.json(result);
		}

		return res.status(400).json({
			message: 'Not found id',
		});
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
		});
	}
};
