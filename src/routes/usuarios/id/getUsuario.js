const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).get(
	'/usuarios/:id',
	userAuthMiddleware,
	
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { models } = req.db

			const usuario = await models.usuario.findByPk(id, { attributes: { exclude: ['senha'] } })
			if (!usuario) return res.status(400).json('Usuário não cadastrado!')

			return res.status(204).send()
		} catch (error) {
			return next(error)
		}
	}
)