const containers = require('../models/containers');

exports.getContainers = async (req, res) => {
	try {
		const containersList = await containers.getAll(req, res);
		return res.json(containersList);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};
