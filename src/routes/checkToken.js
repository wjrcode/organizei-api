const Router = require('express').Router
const jwt = require('jsonwebtoken')

module.exports = Router({ mergeParams: true }).post(
	'/checkToken',
	async (req, res, next) => {
		try {
			const { token } = req.body
			const { models } = req.db

			if (!token || token === '')
				return res.status(403).send('Token vazio!')

			const tokenUsuario = jwt.verify(token, process.env.USER_KEY)

			if (!tokenUsuario) return res.status(403).send('Token inválido!')

			const usuario = await models.usuario.findByPk(tokenUsuario.id)

			if (!usuario) return res.status(403).send('Usuário não encontrado!')

			if (!usuario.ativo) return res.status(403).send('Usuário inativo!')

			return res.json(usuario)
		} catch (error) {
			return next(error)
		}
	}
)
