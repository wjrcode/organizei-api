const getToken = require('./getToken')

module.exports = async (req) => {
	const { models } = req.db
		const token = getToken(req)

		if (!token || token === '') return res.status(403).send('Token vazio!')

		const usuario = await models.usuario.findOne({ where: { token: token } })

		if (!usuario) return res.status(403).send('Usuário não encontrado!')

	return usuario.id
}