const Router = require('express').Router
const convertDateTime = require('../../helpers/convertDateTime')
const getProximoDomingo = require('./helpers/getProximoDomingo')
const getProximaSegunda = require('./helpers/getProximaSegunda')
const getProximaTerca = require('./helpers/getProximaTerca')
const getProximaQuarta = require('./helpers/getProximaQuarta')
const getProximaQuinta = require('./helpers/getProximaQuinta')
const getProximaSexta = require('./helpers/getProximaSexta')
const getProximoSabado = require('./helpers/getProximoSabado')


function returnProximoDia(i, data) {
	if (i == 0)
		return getProximoDomingo(data)
	else if (i == 1)
		return getProximaSegunda(data)
	else if (i == 2)
		return getProximaTerca(data)
	else if (i == 3)
		return getProximaQuarta(data)
	else if (i == 4)
		return getProximaQuinta(data)
	else if (i == 5)
		return getProximaSexta(data)
	else if (i == 6)
		return getProximoSabado(data)
}

module.exports = Router({ mergeParams: true }).post(
	'/habitos',
	async (req, res, next) => {
		try {
			const { nome, dias, hora, cor, dataFinal } = req.body
			const { models } = req.db

			if (!nome) return res.status(202).json({ valido: false, msg: 'Nome não informado!' })
			if (!dias) return res.status(202).json({ valido: false, msg: 'Dias não informados!' })
			if (!hora) return res.status(202).json({ valido: false, msg: 'Hora não informada!' })
			if (!cor) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })
			if (!dataFinal) return res.status(202).json({ valido: false, msg: 'Data final não informada!' })

			if (cor == 0) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			const exists = await models.habito.findOne({ where: { nome, dias } })

			if (exists) return res.status(202).json({ valido: false, msg: 'Já existe um hábito cadastrado com esse nome!' })

			let data = new Date;
			const [horas, minutos] = hora.split(':')
			data.setHours(horas)
			data.setMinutes(minutos)

			const habito = await models.habito.create({
				nome,
				dias: dias.toString(),
				hora: data,
				cor,
				dataFinal: convertDateTime(dataFinal),
				usuarioId: 1
			})

			let proximadata = data

			const d1 = data;
			const d2 =  convertDateTime(dataFinal);
			const diffInMs = new Date(d2) - new Date(d1)
			const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
			console.log(diffInDays) // 38

			for (var i = 0; i < diffInDays; i += 7) {
				dias.map(async (dia, i) => {
					if (dia == '1') {
						proximadata = returnProximoDia(i, proximadata)
						await models.rotina.create({
							dias: dias.toString(),
							data: proximadata,
							cor,
							habitoId: habito.id
						})
					}
				})
			}

			return res.status(201).json({ id: habito.id, valido: true, msg: 'Hábito criado com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)