const containersModel = require('../models/containers');

exports.getContainers = async (req, res) => {
	try {
		const result = await containersModel.getAll();
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
		});
	}
};
