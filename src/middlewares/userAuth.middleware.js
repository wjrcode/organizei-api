const jwt = require('jsonwebtoken')
const getToken = require('../helpers/getToken')

module.exports = async (req, res, next) => {
	try {
		const { models } = req.db
		const token = getToken(req)

		if (!token || token === '') return res.status(403).send('Token vazio!')

		const tokenUsuario = jwt.verify(token, process.env.USER_KEY)

		if (!tokenUsuario) return res.status(403).send('Token inválido!')

		const usuario = await models.usuario.findByPk(tokenUsuario.id)

		if (!usuario) return res.status(403).send('Usuário não encontrado!')

		if (!usuario.ativo) return res.status(403).send('Usuário inativo!')

		req.usuario = usuario
		return next()
	} catch (error) {
		return res.status(500).send(error)
	}
}
