const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const api = require('./api');
const db = require('./db');
const router = require('./router');
const config = require('./config');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api', api);
app.use('/', router);

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: (', p, 'reason:', reason, ')');
});

db.connect(config)
    .then((result) => {

        app.listen(config.PORT, (err) => {
            if (!err)
                console.log(`Сервер запущен на порту ${config.PORT}`);
            else
                console.log(err);
        })
        console.log(result);
        
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });