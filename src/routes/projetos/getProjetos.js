const Router = require('express').Router
const convertDateTime = require('../../helpers/convertDateTimeApp')
const getUsuario = require('../../helpers/getUsuario')
const getProgressoProjeto = require('../../helpers/getProgressoProjeto')
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')
const sequelize = require('sequelize')
//const convertDateTime = require('../../helpers/convertDateTime')

module.exports = Router({ mergeParams: true }).get(
	'/projetos',
	userAuthMiddleware,

	async (req, res, next) => {
		try {
			const { models } = req.db

			const usuarioId = await getUsuario(req);

			let projetos = await await models.projeto.findAll({
				include: ['atividade'],
				order: [
					['id', 'ASC'],
					[models.atividade, 'id', 'ASC']
				],
				where: {
					[sequelize.Op.and]: [
						sequelize.literal("projeto.concluido = false"),
						sequelize.literal(`usuario_id = ${usuarioId}`)
					]
				}

			})

			projetos.map((projeto) => {

				projeto.dataValues.dataInicial = convertDateTime(projeto.dataInicial).substring(0, 10)
				projeto.dataValues.dataFinal = convertDateTime(projeto.dataFinal).substring(0, 10)
				projeto.dataValues.progresso = getProgressoProjeto(projeto)

				projeto.atividade.map((atividade) => {

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