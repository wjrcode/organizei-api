const Router = require('express').Router
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')

module.exports = Router({ mergeParams: true }).post(
	'/signin',
	async (req, res, next) => {
		try {
			const { email, senha } = req.body
			const { models } = req.db

			console.log('apoa loGay')
			console.log(email)
			console.log(senha)

			if (!email || !senha) return res.status(400).json('E-mail/Senha inválidos!')

			const usuario = await models.usuario.findOne({ where: { email } })

			if (!usuario) return res.status(400).json('Usuário não cadastrado!')

			console.log(usuario.senha)

			if (!bcrypt.compareSync(senha, usuario.senha))
				return res.status(400).json('Senha incorreta!')

				const validadeDoToken = Math.floor(
					Date.now() / 1000 + 60 * 60 * 24 * 3
				)
				const { id, nome, apelido } = usuario
				const playload = {
					id,
					nome,
					apelido,
					email,
					exp: validadeDoToken
				}
	
				const token = jwt.sign(playload, process.env.USER_KEY)
	
				return res.json({ ...playload, token })
		} catch (error) {
			return next(error)
		}
	}
)