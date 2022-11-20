const Router = require('express').Router
const convertDateTime = require('../../helpers/convertDateTime')
const getUsuario = require('../../helpers/getUsuario')
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).post(
	'/tarefas',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { nome, data, observacao, prioridade, cor } = req.body
			const { models } = req.db

			const usuarioId = await getUsuario(req);


			if (!nome) return res.status(202).json({ valido: false, msg: 'Nome não informado!' })
			if (!data) return res.status(202).json({ valido: false, msg: 'Data não informada!' })
			if (!observacao) return res.status(202).json({ valido: false, msg: 'Observação não informado!' })
			if (!prioridade) return res.status(202).json({ valido: false, msg: 'Prioridade não informada!' })
			if (!cor) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			if (cor == 0) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			const exists = await models.tarefa.findOne({ where: { nome, data: convertDateTime(data) } })

			if (exists) return res.status(202).json({ valido: false, msg: 'Já existe uma tarefa cadastrada com esse nome e essa data!' })

			const datavalida = new Date(convertDateTime(data)) < new Date() ? false : true

			console.log(datavalida)
			console.log(new Date(convertDateTime(data)))
			console.log(new Date())

			if (!datavalida) return res.status(202).json({ valido: false, msg: 'A data da tarefa não pode ser menor que a data atual!' })

			const tarefa = await models.tarefa.create({
				nome,
				data: convertDateTime(data),
				observacao,
				prioridade,
				cor,
				usuarioId: usuarioId
			})

			return res.status(201).json({ id: tarefa.id, valido: true, msg: 'Tarefa criada com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)