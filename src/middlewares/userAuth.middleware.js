const jwt = require('jsonwebtoken')
const getToken = require('../helpers/getToken')

module.exports = async (req, res, next) => {
	try {
		const { models } = req.db
		const token = getToken(req)

		if (!token || token === '') return res.status(403).send('Token vazio!')

		const usuario = await models.usuario.findOne({where: {token}})

		if (!usuario) return res.status(403).send('Usuário não encontrado!')
		
		return next()
	} catch (error) {
		return res.status(500).send(error)
	}
}