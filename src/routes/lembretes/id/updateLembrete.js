const Router = require('express').Router
const convertDateTime = require('../../../helpers/convertDateTime')

module.exports = Router({ mergeParams: true }).put(
	'/lembretes/:id',
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { nome, data, eAniversario, cor } = req.body
			const { models } = req.db

			if (!nome) return res.status(202).json({ valido: false, msg: 'Nome não informado!' })
			if (!data) return res.status(202).json({ valido: false, msg: 'Data não informada!' })
			if (eAniversario.length < 1) return res.status(202).json({ valido: false, msg: '"É aniversário" não informado!' })
			if (!cor) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			if (cor == 0) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			const exists = await models.lembrete.findByPk(id)

			if (!exists) return res.status(202).json({ valido: false, msg: 'Lembrete não encontrada!' })

			const lembrete = await models.lembrete.update(
				{
					nome,
					data: convertDateTime(data),
					eAniversario,
					cor,
				},
				{ where: { id: id } })

			return res.status(201).json({ id: lembrete.id, valido: true, msg: 'Lembrete alterado com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)