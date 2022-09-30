const Router = require('express').Router

module.exports = Router({ mergeParams: true }).delete(
	'/tarefas/:id',
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { models } = req.db

			if (!id || id == 'null') return res.status(202).json({ valido: false, msg: 'ID não informado!' })

			const exists = await models.tarefa.findByPk(id)

			if (!exists) return res.status(202).json({ valido: false, msg: 'Tarefa não encontrada!' })

			await models.tarefa.destroy({ where: { id } })

			return res.status(201).json({ valido: true, msg: 'Tarefa excluída com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)