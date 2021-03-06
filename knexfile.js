// Update with your config settings.
require('dotenv').config();

const localPg = {
	host: process.env.HOST,
	database: process.env.DATABASE,
	port: process.env.PORT,
	user: process.env.USER,
	password: process.env.PASS || '',
};

const dbConnection = process.env.DATABASE_URL || localPg;

const dbSettings = {
	client: 'pg',
	connection: dbConnection,
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		directory: './db/migrations',
		tableName: 'tbuildermigrations',
	},
	seeds: {
		directory: './db/seeds',
	},
};

module.exports = {
	development: dbSettings,
	production: dbSettings,
};
