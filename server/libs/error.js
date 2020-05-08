const router = require('express').Router();
const config = require('../config');

module.exports = (app) => {
	router.use((req, res, next) => {
		const err = new Error('Not Found');
		err.status = 404;

		next(err);
	});

	router.use((err, req, res, next) => {
		res.status(err.status || 500).json({
			message: 'Not Found',
			status: err.status,
			stack: config.developerMode ? err.stack : '',
			title: 'Oops...',
		});
	});

	app.use('*', router);
};
