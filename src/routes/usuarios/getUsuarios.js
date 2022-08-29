const Router = require('express').Router
const { Op } = require('sequelize')
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).get(
	'/usuarios',
	userAuthMiddleware,

	async (req, res, next) => {
		try {
			const { models } = req.db

			const usuarios = await models.usuario.findAll({
				attributes: { exclude: ['senha'] }
			})

			return res.json(usuarios)
		} catch (error) {
			return next(error)
		}
	}
)