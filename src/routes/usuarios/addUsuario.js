const Router = require('express').Router
const bcrypt = require('bcrypt-nodejs')

module.exports = Router({ mergeParams: true }).post(
	'/usuarios',
	async (req, res, next) => {
		try {
			const { nome, cidade, email, senha } = req.body
			const { usuario: Usuario } = req.db.models

			if (!nome) return res.status(400).json('Nome não informado')

			if (!cidade) return res.status(400).json('Cidade não informada')

			if (!email) return res.status(400).json('Email não informado')

			if (!senha) return res.status(400).json('Senha não informada')

			const exists = await Usuario.findOne({ where: { email } })

			if (exists) {
				return res.status(400).json('Já existe um usuário cadastrado com esse email!')
			}

			const isMaster = email === 'admin@seculos.com.br'

			const salt = bcrypt.genSaltSync(10)

			const senhaCrypt = bcrypt.hashSync(senha, salt)

			await Usuario.create({
				nome,
				cidade,
				email,
				senha: senhaCrypt,
				admin: isMaster,
				master: isMaster,
				ativo: isMaster
			})

			return res.status(204).send()
		} catch (error) {
			return next(error)
		}
	}
)
