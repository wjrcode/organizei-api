const { Sequelize } = require('sequelize')
const config = require('../config/database')
const createRelationship = require('./createRelationship')
const loadModels = require('./loadModels')

module.exports = async () => {
	try {
		console.log(`Creating connection...`)
		const sequelize = new Sequelize(config)

		console.log(`Checking database connection...`)
		await sequelize.authenticate()
		console.log(`Database connected!`)

		console.log(`Loading models...`)
		loadModels(sequelize)

		console.log(`Creating relationship...`)
		createRelationship(sequelize)

		console.log(`Synchronizing models`)
		await sequelize.sync({ force: false })

		console.log(`Database connected!`)
		return sequelize
	} catch (error) {
		console.log(error)
	}
}
