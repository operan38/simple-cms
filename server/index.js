const express = require('express');

const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');


const db = require('./libs/db');
const router = require('./libs/router');
const config = require('./config');

const corsOptions = {
	origin: 'http://localhost:3000',
};

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


if (config.developerMode) { app.use(cors(corsOptions)); }

require('./api')(app);

app.use('/custom', router);

process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at: (', p, 'reason:', reason, ')');
});

async function start() {
	try {
		const dbConnect = await db.connect();

		app.listen(config.port, (err) => {
			if (!err) console.log(`Сервер запущен. (Порт: ${config.port})`);
			else console.error(err);
		});

		console.log(dbConnect);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

start();
