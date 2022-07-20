const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')
const adminAuthMiddleware = require('../../../middlewares/adminAuth.middleware')

module.exports = Router({ mergeParams: true }).put(
	'/usuarios/:id/ativo',
	userAuthMiddleware,
	adminAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { ativo } = req.body
			const { models } = req.db

			const usuario = await models.usuario.findByPk(id)
			if (!usuario) return res.status(400).json('Usuário não cadastrado!')

			if (usuario.ativo !== ativo) {
				usuario.ativo = ativo
				await usuario.save()
			}

			return res.status(204).send()
		} catch (error) {
			return next(error)
		}
	}
)
