const Router = require('express').Router

module.exports = Router({ mergeParams: true }).delete(
	'/habitos/:id',
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { models } = req.db

			if (!id || id == 'null') return res.status(202).json({ valido: false, msg: 'ID não informado!' })

			const exists = await models.habito.findByPk(id)

			if (!exists) return res.status(202).json({ valido: false, msg: 'Hábito não encontrada!' })

			await models.habito.destroy({ where: { id } })

			return res.status(201).json({ valido: true, msg: 'Hábito excluída com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)