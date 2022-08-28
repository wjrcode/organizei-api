const Router = require('express').Router
const { Op } = require('sequelize')
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')
const adminAuthMiddleware = require('../../middlewares/adminAuth.middleware')

module.exports = Router({ mergeParams: true }).get(
	'/usuarios',
	userAuthMiddleware,
	adminAuthMiddleware,
	async (req, res, next) => {
		try {
			const { models } = req.db

			const usuarios = await models.usuario.findAll({
				where,
				attributes: { exclude: ['senha'] }
			})

			return res.json(usuarios)
		} catch (error) {
			return next(error)
		}
	}
)