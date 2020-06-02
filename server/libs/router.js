const express = require('express');
const urlApi = require('url');

const router = express.Router();

const routes = require('../models/routes');

const routesMap = [];

const getURLPattern = (path) => new RegExp(`^${path}/?$`, 'g');

const isRouteExsists = (path) => Object.values(routesMap).find((route) => getURLPattern(route.path.replace(/:id/gi, '([a-zA-Z0-9-]+)')).test(path));

/* let getUrlParams = (url) => {
    let urlVar = url // получаем параметры из урла
    let arrayVar = []; // массив для хранения переменных
    let valueAndKey = []; // массив для временного хранения значения и имени переменной
    let resultArray = []; // массив для хранения переменных

    if (urlVar)
    {
        arrayVar = (urlVar.substr(1)).split('&'); // разбираем урл на параметры

        if (arrayVar[0] == "") return false; // если нет переменных в урле

        for (i = 0; i < arrayVar.length; i ++) { // перебираем все переменные из урла
			valueAndKey = arrayVar[i].split('='); // пишем в массив имя переменной и ее значение
			// пишем в итоговый массив имя переменной и ее значение
            resultArray[valueAndKey[0]] = valueAndKey[1];
        }

        return resultArray; // возвращаем результат
    }
    else
    {
        return false;
    }
} */

router.use(async (req, res, next) => {
	try {
		const decodePath = decodeURI(req.path);
		const fullPath = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
		const fragmentsPath = urlApi.parse(fullPath);

		const routesList = await routes.getOnlyAll();

		if (!routesList) {
			next();
		}

		[...routesList].reduce((object, item) => {
			const currentItem = item;
			const currentObj = object;
			currentItem.pathKey = item.path;
			currentItem.path = currentItem.path.replace(/:id/g, '([a-zA-Z0-9-]+)');
			currentObj[item.pathKey] = item;
			return object;
		}, routesMap);

		const route = isRouteExsists(decodePath);

		if (route) {
			const param = getURLPattern(route.path).exec(decodePath).slice(1);

			if (param) {
				route.param = param;
			}

			const dataView = {};

			dataView.route = route;
			return res.json({ ...dataView });
		}
		return next();
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
