const Router = require('express').Router

module.exports = Router({ mergeParams: true }).put(
	'/tarefas/:id/concluir',
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { concluido } = req.body
			const { models } = req.db

			if (!id || id == 'null') return res.status(202).json({ valido: false, msg: 'ID não informado!' })
			if (!concluido) return res.status(202).json({ valido: false, msg: 'Concluído não informado!' })

			const exists = await models.tarefa.findByPk(id)

			if (!exists) return res.status(202).json({ valido: false, msg: 'Tarefa não encontrada!' })

			await models.tarefa.update(
				{
					concluido
				},
				{ where: { id: id } })

			return res.status(201).json({ valido: true, msg: 'Tarefa concluída com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)