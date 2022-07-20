const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')
const masterAuthMiddleware = require('../../../middlewares/masterAuth.middleware')

module.exports = Router({ mergeParams: true }).put(
	'/usuarios/:id/admin',
	userAuthMiddleware,
	masterAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { admin } = req.body
			const { models } = req.db

			const usuario = await models.usuario.findByPk(id)
			if (!usuario) return res.status(400).json('Usuário não cadastrado!')

			if (usuario.admin !== admin) {
				usuario.admin = admin
				await usuario.save()
			}

			return res.status(204).send()
		} catch (error) {
			return next(error)
		}
	}
)
