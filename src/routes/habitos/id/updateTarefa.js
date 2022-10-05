const Router = require('express').Router
const convertDateTime = require('../../../helpers/convertDateTime')

module.exports = Router({ mergeParams: true }).put(
	'/habitos/:id',
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { nome, dias, hora, cor } = req.body
			const { models } = req.db

			if (!id || id == 'null') return res.status(202).json({ valido: false, msg: 'ID não informado!' })
			if (!nome) return res.status(202).json({ valido: false, msg: 'Nome não informado!' })
			if (!dias) return res.status(202).json({ valido: false, msg: 'Dias não informados!' })
			if (!hora) return res.status(202).json({ valido: false, msg: 'Hora não informada!' })
			if (!cor) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			if (cor == 0) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			const exists = await models.habito.findByPk(id)

			if (!exists) return res.status(202).json({ valido: false, msg: 'Hábito não encontrada!' })

			const habito = await models.habito.update(
				{
					nome,
					dias: dias.toString(),
					hora: convertDateTime(hora),
					cor,
				},
				{ where: { id: id } })

			return res.status(201).json({ id: habito.id, valido: true, msg: 'Hábito alterado com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)