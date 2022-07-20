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

			const validadeDoToken = Math.floor(
				Date.now() / 1000 + 60 * 60 * 24 * 3
			)
			const { id, admin, nome, ativo, master } = usuario
			const playload = {
				id,
				admin,
				master,
				nome,
				email,
				ativo,
				exp: validadeDoToken
			}

			const token = jwt.sign(playload, process.env.USER_KEY)

			return res.json({ ...playload, token })
		} catch (error) {
			return next(error)
		}
	}
)
