const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')
const bcrypt = require('bcrypt-nodejs')

module.exports = Router({ mergeParams: true }).put(
	'/usuarios/:id',
	userAuthMiddleware,
	
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { nome, apelido, email } = req.body
			const { models } = req.db

			if (!nome) return res.status(400).json('Nome não informado!')
			if (!apelido) return res.status(400).json('Apelido não informado!')
			if (!email) return res.status(400).json('Email não informado!')

			const usuario = await models.usuario.findByPk(id)

			if (!usuario) return res.status(400).json('Usuário não cadastrado!')

			if (!(email == usuario.email)) {
				let exists = await models.usuario.findOne({ where: { email } })

				if (exists) return res.status(400).json({ msg: 'Já existe um usuário cadastrado com esse e-mail!' })
			}

			await models.usuario.update(
				{
					nome,
					apelido,
					email,
				},
				{ where: { id: id } }
			)

			return res.status(204).send()
		} catch (error) {
			return next(error)
		}
	}
)