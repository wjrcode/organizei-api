const Router = require('express').Router
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')

module.exports = Router({ mergeParams: true }).post(
	'/signin',
	async (req, res, next) => {
		try {
			const { email, senha } = req.body
			const { models } = req.db

			console.log('aaa')

			if (!email || !senha) return res.status(400).json('E-mail/Senha inválidos!')

			const usuario = await models.usuario.findOne({ where: { email } })

			if (!usuario) return res.status(400).json('Usuário não cadastrado!')

			if (!bcrypt.compareSync(senha, usuario.senha))
				return res.status(400).json('Senha incorreta!')

			return res.json({ token: usuario.token, apelido: usuario.apelido })
		} catch (error) {
			return next(error)
		}
	}
)