const Router = require('express').Router
const convertDateTime = require('../../helpers/convertDateTime')
const getUsuario = require('../../helpers/getUsuario')
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).post(
	'/lembretes',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { nome, data, eAniversario, cor } = req.body
			const { models } = req.db

			const usuarioId = await getUsuario(req)

			if (!nome) return res.status(202).json({ valido: false, msg: 'Nome não informado!' })
			if (!data) return res.status(202).json({ valido: false, msg: 'Data não informada!' })
			//if (eAniversario.length < 1) return res.status(202).json({ valido: false, msg: '"É aniversário" não informado!' })
			if (!cor) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			if (cor == 0) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			const exists = await models.lembrete.findOne({ where: { nome, data: convertDateTime(data) } })

			if (exists) return res.status(202).json({ valido: false, msg: 'Já existe uma lembrete cadastrada com esse nome e essa data!' })

			const lembrete = await models.lembrete.create({
				nome,
				data: convertDateTime(data),
				eAniversario: eAniversario == null? false : eAniversario,
				cor,
				usuarioId: usuarioId
			})

			return res.status(201).json({ id: lembrete.id, valido: true, msg: 'Lembrete criado com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)