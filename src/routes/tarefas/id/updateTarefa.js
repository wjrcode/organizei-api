const Router = require('express').Router
const convertDateTime = require('../../../helpers/convertDateTime')

module.exports = Router({ mergeParams: true }).put(
	'/tarefas/:id',
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { nome, data, observacao, prioridade, cor } = req.body
			const { models } = req.db

			if (!id || id == 'null') return res.status(202).json({ valido: false, msg: 'ID não informado!' })
			if (!nome) return res.status(202).json({ valido: false, msg: 'Nome não informado!' })
			if (!data) return res.status(202).json({ valido: false, msg: 'Data não informada!' })
			if (!observacao) return res.status(202).json({ valido: false, msg: 'Observação não informado!' })
			if (!prioridade) return res.status(202).json({ valido: false, msg: 'Prioridade não informada!' })
			if (!cor) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			if (cor == 0) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			const exists = await models.tarefa.findByPk(id)

			if (!exists) return res.status(202).json({ valido: false, msg: 'Tarefa não encontrada!' })

			await models.tarefa.update(
				{
					nome,
					data: convertDateTime(data),
					observacao,
					prioridade,
					cor,
				},
				{ where: { id: id } })

			return res.status(201).json({ id: id, valido: true, msg: 'Tarefa alterada com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)