const Router = require('express').Router
const convertDateTime = require('../../helpers/convertDateTimeApp')
const sequelize = require('sequelize')
//const convertDateTime = require('../../helpers/convertDateTime')

module.exports = Router({ mergeParams: true }).get(
	'/projetos',
	async (req, res, next) => {
		try {
			const { models } = req.db

			let projetos = await await models.projeto.findAll({
				include: ['atividade'],
				order: [
					['id', 'ASC'],
					[models.atividade, 'id', 'ASC']
				],

			})

			 projetos.map((projeto)=>{
				projeto.dataValues.dataInicial = convertDateTime(projeto.dataInicial).substring(0,10)
				projeto.dataValues.dataFinal = convertDateTime(projeto.dataFinal).substring(0,10)

				projeto.atividade.map((atividade)=>{

					atividade.dataValues.dataInicial = convertDateTime(atividade.dataInicial)
					atividade.dataValues.dataFinal = convertDateTime(atividade.dataFinal)

				})
			})

			return res.status(201).json({ projetos })
		} catch (error) {
			return next(error)
		}
	}
)