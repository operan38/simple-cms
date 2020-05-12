const headerNavModel = require('../models/headerNav');

exports.getHeaderNav = async (req, res) => {
	try {
		const result = await headerNavModel.getAll(req, res);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};
