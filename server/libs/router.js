const express = require('express');
const urlApi = require('url');
const router = express.Router();
const config = require('../config');

const model = require('../models');

let routesMap = [];

let getURLPattern = url => new RegExp(`^${url}/?$`, 'g');

let isRouteExsists = (url) => {
    return Object.values(routesMap).find(route => getURLPattern(route.url.replace(/:id/gi, '([a-zA-Z0-9-]+)')).test(url));
}

/*let getUrlParams = (url) => {
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
            resultArray[valueAndKey[0]] = valueAndKey[1]; // пишем в итоговый массив имя переменной и ее значение
        }
    
        return resultArray; // возвращаем результат
    }
    else
    {
        return false;
    }
}*/

router.use(async (req, res, next) => {

    try {

        let decodePath = decodeURI(req.path);
        let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        let fragmentsUrl = urlApi.parse(fullUrl);

        //console.log(getUrlParams(fragmentsUrl.search));

        let routesList = await model.routes.getAll();
        //let componetsList = await model.componets.get();

        //console.log(componetsList);

        //console.log(fragmentsUrl);


        if (!routesList)
        {
            next();
        }
            
        [...routesList].reduce((object, item) => {
            item.urlKey = item.url;
            item.url = item.url.replace(/:id/g, '([a-zA-Z0-9\-]+)');
            object[item.urlKey] = item;
            return object;
        }, routesMap);

        let route = isRouteExsists(decodePath);

        //console.log(routesMap);


        //console.log(route);

        if (route)
        {
            let param = getURLPattern(route.url).exec(decodePath).slice(1);

            if (param)
            {
                route.param = param;
            }

            getSection(res, route);
        }
        else
        {
            next();
        }
    }
    catch (e) {
        next(e);
    }
});

let getSection = (res, route) => {

    return model.sections.getById(route.id).then((section) => {
        let dataView = {};

        dataView.route = route;
        dataView.section = section;

        //return res.render('index', { ...dataView });


        return res.send({...dataView});

        /*return res.json([{
            route: dataView.route,
            section: dataView.section
        },]);*/


    }).catch((e) => {
        return res.send("Section: " + e);
    });;
}

router.use((req, res, next) => {

    const err = new Error('Not Found');
    err.status = 404;
    
    next(err);
});

router.use((err, req, res, next) => {
    
    res.status(err.status || 500).send({
        message: 'Not Found',
        status: err.status,
        stack: config.developerMode ? err.stack : '',
        title: 'Oops...'
    });
    /*res.render('error', {
        message: err.message,
        status: err.status,
        stack: !config.IS_PRODUCTION ? err.stack : '',
        title: 'Oops...'
    });*/
});

module.exports = router;