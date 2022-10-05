const Router = require('express').Router
const convertDateTime = require('../../helpers/convertDateTime')

module.exports = Router({ mergeParams: true }).post(
	'/habitos',
	async (req, res, next) => {
		try {
			const { nome, dias, hora, cor } = req.body
			const { models } = req.db


			if (!nome) return res.status(202).json({ valido: false, msg: 'Nome não informado!' })
			if (!dias) return res.status(202).json({ valido: false, msg: 'Dias não informados!' })
			if (!hora) return res.status(202).json({ valido: false, msg: 'Hora não informada!' })
			if (!cor) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			if (cor == 0) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			const exists = await models.habito.findOne({ where: { nome, dias } })

			if (exists) return res.status(202).json({ valido: false, msg: 'Já existe um hábito cadastrado com esse nome!' })

			const habito = await models.habito.create({
				nome,
				dias: dias.toString(),
				hora: convertDateTime(hora),
				cor,
				usuarioId: 1
			})

			return res.status(201).json({ id: habito.id, valido: true, msg: 'Hábito criado com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)