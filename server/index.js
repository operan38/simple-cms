const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./api');
const db = require('./libs/db');
const router = require('./libs/router');
const config = require('./config');

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(cors(corsOptions));

app.use('/api', api);
app.use('/ajax', router);

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: (', p, 'reason:', reason, ')');
});

db.connect(config)
    .then((result) => {

        app.listen(config.port, (err) => {
            if (!err)
                console.log(`API cервер запущен. Порт: ${config.port}`);
            else
                console.log(err);
        })
        console.log(result);
        
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });