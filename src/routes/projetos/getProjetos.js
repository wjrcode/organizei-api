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
				where: { concluido: false }

			})

			projetos.map((projeto) => {
				let qtdBaixa = projeto.atividade.filter(atividade => {
					if (atividade.prioridade == 'baixa') {
						return true;
					}

					return false;
				}).length;
				let qtdMedia = projeto.atividade.filter(atividade => {
					if (atividade.prioridade == 'média') {
						return true;
					}

					return false;
				}).length;
				let qtdAlta = projeto.atividade.filter(atividade => {
					if (atividade.prioridade == 'alta') {
						return true;
					}

					return false;
				}).length;

				let qtdBaixaConcluida = projeto.atividade.filter(atividade => {
					if (atividade.prioridade == 'baixa' && atividade.concluido) {
						return true;
					}

					return false;
				}).length;
				let qtdMediaConcluida = projeto.atividade.filter(atividade => {
					if (atividade.prioridade == 'média' && atividade.concluido) {
						return true;
					}

					return false;
				}).length;
				let qtdAltaConcludida = projeto.atividade.filter(atividade => {
					if (atividade.prioridade == 'alta' && atividade.concluido) {
						return true;
					}

					return false;
				}).length;

				pesoBaixa = (qtdBaixa * 100) / projeto.atividade.length
				pesoMedia = (qtdMedia * 100) / projeto.atividade.length
				pesoAlta = (qtdAlta * 100) / projeto.atividade.length

				console.log(qtdMedia)

				let porcentagem = 0

				if (qtdBaixa > 0 && qtdMedia > 0 && qtdAlta > 0) {
					porcentagem = ((pesoBaixa / qtdBaixa) * qtdBaixaConcluida) + ((pesoMedia / qtdMedia) * qtdMediaConcluida) + ((pesoAlta / qtdAlta) * qtdAltaConcludida)
				}
				else if (qtdBaixa > 0 && qtdMedia > 0) {
					porcentagem = ((pesoBaixa / qtdBaixa) * qtdBaixaConcluida) + ((pesoMedia / qtdMedia) * qtdMediaConcluida)
				}
				else if (qtdBaixa > 0 && qtdAlta > 0) {
					porcentagem = ((pesoBaixa / qtdBaixa) * qtdBaixaConcluida) + ((pesoAlta / qtdAlta) * qtdAltaConcludida)
				}
				else if (qtdMedia > 0 && qtdAlta > 0) {
					porcentagem = ((pesoMedia / qtdMedia) * qtdMediaConcluida) + ((pesoAlta / qtdAlta) * qtdAltaConcludida)
				}
				else if (qtdBaixa > 0) {
					porcentagem = ((pesoBaixa / qtdBaixa) * qtdBaixaConcluida)
				}
				else if (qtdMedia > 0) {
					console.log(pesoMedia)
					console.log(qtdMediaConcluida)
					porcentagem = ((pesoMedia / qtdMedia) * qtdMediaConcluida)
				}
				else if (qtdAlta > 0) {
					porcentagem = ((pesoAlta / qtdAlta) * qtdAltaConcludida)
				}


				console.log(porcentagem);
				projeto.dataValues.dataInicial = convertDateTime(projeto.dataInicial).substring(0, 10)
				projeto.dataValues.dataFinal = convertDateTime(projeto.dataFinal).substring(0, 10)
				projeto.dataValues.progresso = porcentagem + '%'

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