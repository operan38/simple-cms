const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname);
dotenv.config({ path: root('.env') });


module.exports = {
	db: {
		host: process.env.HOST,
		user: process.env.USER,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
	},
	jwtSecret: process.env.JWT_TOKEN,
	port: process.env.PORT || 3001,
	developerMode: process.env.NODE_ENV === 'development',
};
