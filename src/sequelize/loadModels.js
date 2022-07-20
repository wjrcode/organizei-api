const glob = require('glob')

module.exports = sequelize =>
	glob
		.sync('models/**/*.js', { cwd: `${__dirname}/` })
		.map(filename => require(`./${filename}`))
		.forEach(model => model(sequelize, { logging: console.log }))
