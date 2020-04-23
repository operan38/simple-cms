const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const db = require('./libs/db');
const router = require('./libs/router');
const config = require('./config');

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cors(corsOptions));
require('./api')(app);
app.use('/custom', router);

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: (', p, 'reason:', reason, ')');
});

db.connect(config)
    .then((result) => {

        app.listen(config.port, (err) => {
            if (!err)
                console.log(`Сервер запущен. (Порт: ${config.port})`);
            else
                console.log(err);
        })
        console.log(result);
        
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });