const Router = require('express').Router

module.exports = Router({ mergeParams: true }).put(
	'/item/:id/concluir',
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { concluido } = req.body
			const { models } = req.db

			if (!id || id == 'null') return res.status(202).json({ valido: false, msg: 'ID não informado!' })
			//if (concluido == '' || concluido == null || concluido == 'null') return res.status(202).json({ valido: false, msg: 'Concluído não informado!' })

			const exists = await models.item.findByPk(id)

			if (!exists) return res.status(202).json({ valido: false, msg: 'Item não encontrada!' })

			await models.item.update(
				{
					concluido
				},
				{ where: { id } })

			return res.status(201).json({ valido: true, msg: concluido? 'Item concluído com sucesso!' : 'Item desfeito!' })
		} catch (error) {
			return next(error)
		}
	}
)