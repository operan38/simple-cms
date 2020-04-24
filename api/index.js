module.exports = (app) => {
    const router = require('express').Router();

    const routes = require('../models/routes');
    const containers = require('../models/containers');
    const users = require('./users');

    router.post('/routes', routes.getAll);
    router.post('/routes/add', routes.add);
    router.post('/routes/del', routes.del);

    router.post('/containers', containers.getAll);
    router.post('/users/register', users.validRegister(), users.register);
    router.post('/users/login', users.validLogin(), users.login);

    app.use('/api', router);
}