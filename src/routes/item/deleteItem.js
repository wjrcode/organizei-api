const Router = require('express').Router

module.exports = Router({ mergeParams: true }).delete(
	'/item/:id',
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { models } = req.db

            console.log('its that for me')
            console.log(id)

			if (!id || id == 'null') return res.status(202).json({ valido: false, msg: 'ID não informado!' })

			const exists = await models.item.findByPk(id)

			if (!exists) return res.status(202).json({ valido: false, msg: 'Item não encontrada!' })

			await models.item.destroy({ where: { id } })

			return res.status(201).json({ valido: true, msg: 'Item excluído com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)