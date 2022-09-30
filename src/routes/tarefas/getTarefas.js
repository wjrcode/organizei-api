const Router = require('express').Router
const convertDateTime = require('../../helpers/convertDateTimeApp')
//const convertDateTime = require('../../helpers/convertDateTime')

module.exports = Router({ mergeParams: true }).get(
	'/tarefas',
	async (req, res, next) => {
		try {
			const { models } = req.db

			const results = await await models.tarefa.findAll({
				order: [['data', 'asc']],
				where: {concluido : false}
			})

			let tarefas = []


			results.map((tarefa) => {
				tarefas.push({
					id: tarefa.id,
					nome: tarefa.nome,
					data: convertDateTime(tarefa.data),
					observacao: tarefa.observacao,
					prioridade: tarefa.prioridade,
					cor: tarefa.cor
				})
			})

			return res.status(201).json({ tarefas })
		} catch (error) {
			return next(error)
		}
	}
)