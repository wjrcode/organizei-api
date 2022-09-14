const Router = require('express').Router
const bcrypt = require('bcrypt-nodejs')

module.exports = Router({ mergeParams: true }).post(
	'/usuarios',
	async (req, res, next) => {
		try {
			const { nome, apelido, email, senha } = req.body
			const { models } = req.db

			if (!nome) return res.status(202).json({ valido: false, msg: 'Nome não informado!' })
			if (!apelido) return res.status(202).json({valido: false, msg: 'Apelido não informado!'})
			if (!email) return res.status(202).json({valido: false, msg: 'E-mail não informado!'})
			if (!senha) return res.status(202).json({valido: false, msg: 'Senha não informada!'})

			const exists = await models.usuario.findOne({ where: { email } })

			if (exists) {
				return res.status(202).json({valido: false, msg: 'Já existe um usuário cadastrado com esse e-mail!'})
			}

			const salt = bcrypt.genSaltSync(10)
			const senhaCrypt = bcrypt.hashSync(senha, salt)

			const usuario = await models.usuario.create({
				nome,
				apelido,
				email,
				senha: senhaCrypt,
			})

			return res.status(201).json({ id: usuario.id, valido: true, msg: 'Usuário criado com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)