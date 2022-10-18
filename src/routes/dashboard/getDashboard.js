const Router = require('express').Router
const sequelize = require('sequelize')
const getUsuario = require('../../helpers/getUsuario')
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')
const getProgressoProjeto = require('../../helpers/getProgressoProjeto')
//const convertDateTime = require('../../helpers/convertDateTime')

module.exports = Router({ mergeParams: true }).get(
	'/dashboard',
	userAuthMiddleware,

	async (req, res, next) => {
		try {
			const { models } = req.db

			const usuarioId = await getUsuario(req);

			const tarefas = await await models.tarefa.findAll({
				order: [['data', 'asc']],
				//where: { concluido: false }

				where: {
					[sequelize.Op.and]: [
						sequelize.literal("to_char(data, 'IYYY-IW') = to_char(current_date, 'IYYY-IW')"),
						sequelize.literal(`usuario_id = ${usuarioId}`)
					]
				}
			})

			const habitos = await await models.habito.findAll({
				order: [['hora', 'asc']],
				include: ['rotina'],
				where: {
					[sequelize.Op.and]: [
						sequelize.literal("to_char(rotina.data, 'IYYY-IW') = to_char(current_date, 'IYYY-IW')"),
						sequelize.literal(`usuario_id = ${usuarioId}`)
					]
				}
			})

			const projetos = await await models.projeto.findAll({
				include: ['atividade'],
				order: [
					['id', 'ASC'],
					[models.atividade, 'id', 'ASC']
				],
				where: {
					[sequelize.Op.and]: [
						sequelize.literal("to_char(atividade.data_inicial, 'IYYY-IW') = to_char(current_date, 'IYYY-IW')"),
						sequelize.literal(`usuario_id = ${usuarioId}`)
					]
				}

			})

			let dashboard = []
			let msg = ''

			if (tarefas) {
				const qtdTarefasSemana = tarefas.length
				const qtdTarefasSemanaConcluidas = tarefas.filter(tarefa => {
					if (tarefa.concluido) {
						return true;
					}

					return false;
				}).length;



				if (qtdTarefasSemana == qtdTarefasSemanaConcluidas) msg = 'Mandou bem! Você fez todas as tarefas da semana.'
				else if (qtdTarefasSemanaConcluidas == 0) msg = `Vish! Você fez ${qtdTarefasSemanaConcluidas} das ${qtdTarefasSemana} tarefas da semana.`
				else if (qtdTarefasSemana - 1 == qtdTarefasSemanaConcluidas) msg = `Quase lá! Você fez ${qtdTarefasSemanaConcluidas} das ${qtdTarefasSemana} tarefas da semana.`

				dashboard.push({
					dash: ` ${qtdTarefasSemanaConcluidas}/${qtdTarefasSemana}`,
					msg,
					cor: tarefas[0].cor
				})
			}

			if (habitos) {
				const qtdTarefasSemana = habitos.length
				const qtdTarefasSemanaConcluidas = habitos.filter(tarefa => {
					if (tarefa.concluido) {
						return true;
					}

					return false;
				}).length;



				if (qtdTarefasSemana == qtdTarefasSemanaConcluidas) msg = 'Tudo! Você fez todas os hábitos da semana.'
				else if (qtdTarefasSemanaConcluidas == 0) msg = `Eita! Você fez ${qtdTarefasSemanaConcluidas} dos ${qtdTarefasSemana} hábitos da semana.`
				else if (qtdTarefasSemana - 1 == qtdTarefasSemanaConcluidas) msg = `Falta pouco! Você fez ${qtdTarefasSemanaConcluidas} dos ${qtdTarefasSemana} hábitos da semana.`

				dashboard.push({
					dash: ` ${qtdTarefasSemanaConcluidas}/${qtdTarefasSemana}`,
					msg,
					cor: habitos[0].cor
				})
			}

			if (projetos) {
				projetos.map((projeto) => {

					msg = `Continue assim! Você concluiu ${getProgressoProjeto(projeto)} do projeto ${projeto.nome}`
					if (getProgressoProjeto(projeto) == '0%') msg = `Poxa! Você concluiu ${getProgressoProjeto(projeto)} do projeto ${projeto.nome}`
					if (getProgressoProjeto(projeto) == '100%') msg = `Arrasou! Você concluiu ${getProgressoProjeto(projeto)} do projeto ${projeto.nome}`

					dashboard.push({
						dash: getProgressoProjeto(projeto),
						msg,
						cor: projeto.cor

					})


					const qtdTarefasSemana = projeto.atividade.length
					const qtdTarefasSemanaConcluidas = projeto.atividade.filter(atividade => {
						if (atividade.concluido) {
							return true;
						}

						return false;
					}).length;



					if (qtdTarefasSemana == qtdTarefasSemanaConcluidas) msg = `Mandou bem! Você fez todas as atividades da semana  do projeto ${projeto.nome}.`
					else if (qtdTarefasSemanaConcluidas == 0) msg = `Vish! Você fez ${qtdTarefasSemanaConcluidas} das ${qtdTarefasSemana} atividades da semana do projeto ${projeto.nome}.`
					else if (qtdTarefasSemana - 1 == qtdTarefasSemanaConcluidas) msg = `Quase lá! Você fez ${qtdTarefasSemanaConcluidas} das ${qtdTarefasSemana} atividades da semana do projeto ${projeto.nome}.`
					
					dashboard.push({
						dash: ` ${qtdTarefasSemanaConcluidas}/${qtdTarefasSemana}`,
						msg,
						cor: projeto.atividade[0].cor
					})

				})
			}

			return res.status(201).json({ dashboard })
		} catch (error) {
			return next(error)
		}
	}
)