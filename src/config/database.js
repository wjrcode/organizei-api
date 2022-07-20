if (process.env.NODE_ENV != "production")
	require('dotenv').config()

module.exports = {
	dialect: process.env.DIALECT,
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
	define: {
		timestamps: true,
		underscored: true
	},
	dialectOptions: {
		encrypt: false,
		dateStrings: true,
		typeCast: true
	},
	pool: {
		max: 50,
		min: 0,
		idle: 5000,
	},
	logging: false,
	force: true
}
