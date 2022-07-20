const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')
const bcrypt = require('bcrypt-nodejs')

module.exports = Router({ mergeParams: true }).put(
	'/usuarios/:id',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { nome, cidade, senha } = req.body
			const { usuario: Usuario } = req.db.models
			const { usuario: loggedUser } = req

			if (!nome) return res.status(400).json('Nome não informado!')
			if (!cidade) return res.status(400).json('Cidade não informada!')

			const usuario = await Usuario.findByPk(id, { attributes: { exclude: ['senha'] } })

			if (!usuario) return res.status(400).json('Usuário não cadastrado!')

			if (usuario.id != loggedUser.id) {
				if (usuario.master && !loggedUser.master) return next('')
				if (usuario.admin && !loggedUser.master) return next('Sem permissão!')
				if (!loggedUser.admin)  return next('Sem permissão')
			}

			usuario.nome = nome
			usuario.cidade = cidade

			if (senha) {
				const salt = bcrypt.genSaltSync(10)
				const senhaCrypt = bcrypt.hashSync(senha, salt)
				usuario.senha = senhaCrypt
			}
			
			await usuario.save()

			return res.status(204).send()
		} catch (error) {
			return next(error)
		}
	}
)
