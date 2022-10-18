const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')
const bcrypt = require('bcrypt-nodejs')

module.exports = Router({ mergeParams: true }).put(
	'/usuarios/:id',
	userAuthMiddleware,

	async (req, res, next) => {
		try {
			const { id } = req.params
			const { nome, apelido, email, senha, novaSenha } = req.body
			const { models } = req.db

			if (!nome) return res.status(202).json({ valido: false, msg: 'Nome não informado!' })
			if (!apelido) return res.status(202).json({ valido: false, msg: 'Apelido não informado!' })
			if (!email) return res.status(202).json({ valido: false, msg: 'E-mail não informado!' })
			//if (!senha) return res.status(202).json({valido: false, msg: 'Senha não informada!'})

			const usuario = await models.usuario.findByPk(id)

			if (!usuario) return res.status(400).json('Usuário não cadastrado!')

			if (!(email == usuario.email)) {
				let exists = await models.usuario.findOne({ where: { email } })

				if (exists) return res.status(400).json({ msg: 'Já existe um usuário cadastrado com esse e-mail!' })
			}

			if (novaSenha && !senha) return res.status(202).json({ valido: false, msg: 'A senha atual não foi informada!' })
			else if (!novaSenha && senha) return res.status(202).json({ valido: false, msg: 'A senha nova não foi informada!' })
			else if (novaSenha && senha) {

				if (!bcrypt.compareSync(senha, usuario.senha)) return res.status(400).json({ valido: false, msg: 'A senha atual está incorreta!' })

				const salt = bcrypt.genSaltSync(10)

				const senhaCrypt = bcrypt.hashSync(novaSenha, salt)

				await models.usuario.update(
					{
						nome,
						apelido,
						email,
						senha: senhaCrypt
					},
					{ where: { id: id } }
				)

			} else {
				await models.usuario.update(
					{
						nome,
						apelido,
						email,

					},
					{ where: { id: id } }
				)
			}

			return res.status(201).json({ valido: true, msg: 'Usuário alterado com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)