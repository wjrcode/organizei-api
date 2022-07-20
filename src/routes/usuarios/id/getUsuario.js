const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).get(
	'/usuarios/:id',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { usuario: Usuario } = req.db.models
			const { usuario: loggedUser } = req

			const usuario = await Usuario.findByPk(id, { attributes: { exclude: ['senha'] } })
			if (!usuario) return res.status(400).json('Usuário não cadastrado!')

			if (usuario.id != loggedUser.id) {
				if (usuario.master && !loggedUser.master) return next('')
				if (usuario.admin && !loggedUser.master) return next('Sem permissão!' )
				if (!loggedUser.admin) return next( 'Sem permissão!')
			}

			return res.json(usuario)
		} catch (error) {
			return next(error)
		}
	}
)
