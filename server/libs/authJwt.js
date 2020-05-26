const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticateJWT = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(' ')[1];

		jwt.verify(token, config.jwtSecret, (err, user) => {
			if (err) {
				res.status(403).json({
					message: 'Доступ запрещен',
				});

				console.log('err::::', err);
			}

			req.user = user;
			console.log('user::::', user.id);

			next();
		});
	} else {
		res.status(401).json({
			message: 'Для просмотра содержимого необходимо авторизоватся',
		});
	}
};

module.exports = { authenticateJWT };
