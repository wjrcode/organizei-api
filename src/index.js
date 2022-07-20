const PORT = process.env.PORT || 4444
const createDatabase = require('./sequelize/createDatabase.js')
const createApp = require('./createApp')

async function init() {
	try {
		const database = await createDatabase()

		if (!database) return

		console.log(`Inicializando API: ${PORT}.`)
		const app = createApp({ database })

		app.listen(PORT, () => {
			console.log(`API Organizei foi inicializada na porta: ${PORT}.`)
		})
	} catch (error) {
		console.error(error)
	}
}

init()
