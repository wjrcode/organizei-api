const Router = require('express').Router

module.exports = Router({ mergeParams: true }).get(
	'/usuario/:id',
	
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { models } = req.db

			const usuario = await models.usuario.findOne({ where: { token: id } }, { attributes: { exclude: ['senha'] } })
			if (!usuario) return res.status(400).json('Usuário não cadastrado!')

			return res.json(usuario)
		} catch (error) {
			return next(error)
		}
	}
)