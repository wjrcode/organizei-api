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
			const { search = '' } = req.query
			const { usuario: Usuario } = req.db.models
			const { usuario } = req

			let where = new Object()

			if (search) {
				where[Op.or] = {
					email: { [Op.like]: `%${search}%` },
					nome: { [Op.like]: `%${search}%` }
				}
			}
			if (!usuario || !usuario.master) {
				where[Op.or] = {
					admin: false,
					id: usuario.id
				}
			}

			const usuarios = await Usuario.findAll({
				where,
				attributes: { exclude: ['senha'] }
			})
			return res.json(usuarios)
		} catch (error) {
			return next(error)
		}
	}
)
