const express = require('express');
const urlApi = require('url');

const router = express.Router();
const config = require('../config');

const routes = require('../models/routes');
// const sections = require('../models/sections');

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

// eslint-disable-next-line consistent-return
router.use(async (req, res, next) => {
	try {
		const decodePath = decodeURI(req.path);
		const fullPath = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
		const fragmentsPath = urlApi.parse(fullPath);

		// console.log(getUrlParams(fragmentsUrl.search));

		const routesList = await routes.getOnlyAll();
		// let componetsList = await model.componets.get();

		// console.log(componetsList);

		// console.log(fragmentsUrl);

		if (!routesList) {
			next();
		}

		[...routesList].reduce((object, item) => {
			// eslint-disable-next-line no-param-reassign
			item.pathKey = item.path;
			// eslint-disable-next-line no-param-reassign
			item.path = item.path.replace(/:id/g, '([a-zA-Z0-9-]+)');
			// eslint-disable-next-line no-param-reassign
			object[item.pathKey] = item;
			return object;
		}, routesMap);

		const route = isRouteExsists(decodePath);

		// console.log(routesMap);

		// console.log(route);

		if (route) {
			const param = getURLPattern(route.path).exec(decodePath).slice(1);

			if (param) {
				route.param = param;
			}

			const dataView = {};

			dataView.route = route;
			return res.json({ ...dataView });

			// getSection(res, route);
		}

		return next();
	} catch (e) {
		next(e);
	}
});

/* let getSection = (res, route) => {

    return sections.getById(route.id).then((section) => {
        let dataView = {};

        dataView.route = route;
        dataView.section = section;

        //return res.render('index', { ...dataView });


        return res.json({...dataView});

    }).catch((e) => {
        return res.json("Section: " + e);
    });;
} */

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

module.exports = router;
