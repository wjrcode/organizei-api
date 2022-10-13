const Router = require('express').Router
const convertDateTime = require('../../../helpers/convertDateTime')
const getProximoDomingo = require('../helpers/getProximoDomingo')
const getProximaSegunda = require('../helpers/getProximaSegunda')
const getProximaTerca = require('../helpers/getProximaTerca')
const getProximaQuarta = require('../helpers/getProximaQuarta')
const getProximaQuinta = require('../helpers/getProximaQuinta')
const getProximaSexta = require('../helpers/getProximaSexta')
const getProximoSabado = require('../helpers/getProximoSabado')
const sequelize = require('sequelize')

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


module.exports = Router({ mergeParams: true }).put(
	'/habitos/:id',
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { nome, dias, hora, cor, dataFinal } = req.body
			const { models } = req.db

			if (!id || id == 'null') return res.status(202).json({ valido: false, msg: 'ID não informado!' })
			if (!nome) return res.status(202).json({ valido: false, msg: 'Nome não informado!' })
			if (!dias) return res.status(202).json({ valido: false, msg: 'Dias não informados!' })
			if (!hora) return res.status(202).json({ valido: false, msg: 'Hora não informada!' })
			if (!cor) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })
			if (!dataFinal) return res.status(202).json({ valido: false, msg: 'Data final não informada!' })

			if (cor == 0) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			const exists = await models.habito.findByPk(id)

			if (!exists) return res.status(202).json({ valido: false, msg: 'Hábito não encontrada!' })

			let data = new Date;
			const [horas, minutos] = hora.split(':')
			data.setHours(horas)
			data.setMinutes(minutos)

			const habito = await models.habito.update(
				{
					nome,
					dias: dias.toString(),
					hora: data,
					dataFinal: convertDateTime(dataFinal),
					cor,
				},
				{ where: { id: id } })

			await models.rotina.destroy({
				where: {
					[sequelize.Op.and]: [
						sequelize.literal(`habito_id = ${id}`),
						sequelize.literal(`data >= '${data.toISOString()}'`),
						sequelize.literal('concluido <> true')
					]
				}
			})

			let proximadata = data

			const d1 = data;
			const d2 = convertDateTime(dataFinal);
			const diffInMs = new Date(d2) - new Date(d1)
			const diffInDays = diffInMs / (1000 * 60 * 60 * 24);


			for (var i = 0; i < diffInDays; i += 7) {
				dias.map(async (dia, i) => {
					if (dia == '1') {
						proximadata = returnProximoDia(i, proximadata)
						await models.rotina.create({
							dias: dias.toString(),
							data: proximadata,
							cor,
							habitoId: id
						})
					}
				})
			}

			return res.status(201).json({ id: id, valido: true, msg: 'Hábito alterado com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)