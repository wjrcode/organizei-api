const Router = require('express').Router

module.exports = Router({ mergeParams: true }).put(
	'/listas/:id',
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { nome, cor, itens } = req.body
			const { models } = req.db

			if (!id || id == 'null') return res.status(202).json({ valido: false, msg: 'ID não informado!' })
			if (!nome) return res.status(202).json({ valido: false, msg: 'Nome não informado!' })
			if (!cor) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })
			if (!itens) return res.status(202).json({ valido: false, msg: 'Itens não informados!' })

			if (cor == 0) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			const exists = await models.lista.findByPk(id)

			if (!exists) return res.status(202).json({ valido: false, msg: 'Lista não encontrada!' })

			const lista = await models.lista.update(
				{
					nome,
					cor,
				},
				{ where: { id: id } })

			itens.map(async (item) => {
				if (item.id)
					await models.item.update({
						nome: item.nome,
					}, { where: { id: item.id } })
				else await models.item.create({
					nome: item.nome,
					listumId: id
				})
			})

			return res.status(201).json({ id: lista.id, valido: true, msg: 'Lista alterada com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)