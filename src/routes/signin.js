const Router = require('express').Router
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')

module.exports = Router({ mergeParams: true }).post(
	'/signin',
	async (req, res, next) => {
		try {
			const { email, senha } = req.body
			const { usuario: Usuario } = req.db.models

			if (!email || !senha) return res.status(400).json('E-mail/Senha inválidos!')

			const usuario = await Usuario.findOne({ where: { email } })

			if (!usuario) return res.status(400).json('Usuário não cadastrado!')

			if (!usuario.ativo) return res.status(400).json('Usuário inativo!')

			if (!bcrypt.compareSync(senha, usuario.senha))
				return res.status(400).json('Senha incorreta!')

			return res.status(204).send()
		} catch (error) {
			return next(error)
		}
	}
)