const Router = require('express').Router
const convertDateTime = require('../../helpers/convertDateTimeApp')
const sequelize = require('sequelize')
//const convertDateTime = require('../../helpers/convertDateTime')

module.exports = Router({ mergeParams: true }).get(
	'/projetos',
	async (req, res, next) => {
		try {
			const { models } = req.db

			const projetos = await await models.projeto.findAll({
				order: [
					['id', 'ASC'],
				],

			})

			return res.status(201).json({ projetos })
		} catch (error) {
			return next(error)
		}
	}
)