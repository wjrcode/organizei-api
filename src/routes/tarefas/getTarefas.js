const Router = require('express').Router
const convertDateTime = require('../../helpers/convertDateTimeApp')
const sequelize = require('sequelize')
//const convertDateTime = require('../../helpers/convertDateTime')

module.exports = Router({ mergeParams: true }).get(
	'/tarefas',
	async (req, res, next) => {
		try {
			const { models } = req.db

			let dataHoje = new Date()

			const results = await await models.tarefa.findAll({
				order: [['data', 'asc']],
				where: { concluido: false }
			})

			const habitos = await await models.habito.findAll({
				order: [['hora', 'asc']],
				include: ['rotina'],
				where: {
					[sequelize.Op.and]: [
						sequelize.literal('habito.ativo = true'),
						sequelize.literal('rotina.concluido <> true')
					]
				}
			})

			const lembretes = await models.lembrete.findAll({
				order: [['data', 'asc']],
				where: { concluido: false }
			})

			const projetos = await await models.projeto.findAll({
				include: ['atividade'],
				order: [
					['id', 'ASC'],
					[models.atividade, 'id', 'ASC']
				],
				where: {
					[sequelize.Op.and]: [
						sequelize.literal('projeto.concluido <> true'),
						sequelize.literal('atividade.concluido <> true')
					]
				}

			})


			let tarefas = []

			results.map((tarefa) => {

				let tamanho = tarefa.nome.length

				let nomeFormatado = ''

				for (var i = 0; i < tamanho; i += 15) {

					if (i > 0) nomeFormatado = nomeFormatado + `\n`;

					nomeFormatado = nomeFormatado + tarefa.nome.slice(i, i + 15)

				}
				tarefas.push({
					id: tarefa.id,
					nome: tarefa.nome,
					nomeFormatado,
					dataFormatada: convertDateTime(tarefa.data, 'às '),
					data: convertDateTime(tarefa.data,),
					dataOrdenacao: tarefa.data,
					observacao: tarefa.observacao,
					prioridade: tarefa.prioridade,
					cor: tarefa.cor,
					tipo: 'tarefa'
				})
			})

			habitos.map((habito) => {

				habito.rotina.map((rotina) => {



					let tamanho = habito.nome.length

					let nomeFormatado = ''

					for (var i = 0; i < tamanho; i += 15) {

						if (i > 0) nomeFormatado = nomeFormatado + `\n`;

						nomeFormatado = nomeFormatado + habito.nome.slice(i, i + 15)

					}

					const dia = habito.dias.replace(/(\[)|(\])|(\ )/g, "")

					const dias = dia.split(',')
					tarefas.push({
						id: habito.id,
						idRotina: rotina.id,
						nome: habito.nome,
						nomeFormatado,
						hora: convertDateTime(rotina.data),
						dataFinal: convertDateTime(habito.dataFinal),
						dataOrdenacao: rotina.data,
						dataFormatada: convertDateTime(rotina.data, 'às '),
						dias: dias,
						cor: habito.cor,
						tipo: 'habito'
					})

				})
			})

			lembretes.map((tarefa) => {

				let tamanho = tarefa.nome.length

				let nomeFormatado = ''

				for (var i = 0; i < tamanho; i += 15) {

					if (i > 0) nomeFormatado = nomeFormatado + `\n`;

					nomeFormatado = nomeFormatado + tarefa.nome.slice(i, i + 15)

				}

				let dataConcluiu = new Date(tarefa.dataConcluiu)

				if (!tarefa.eAniversario) {
					tarefas.push({
						id: tarefa.id,
						nome: tarefa.nome,
						nomeFormatado,
						dataFormatada: convertDateTime(tarefa.data, 'às '),
						data: convertDateTime(tarefa.data),
						eAniversario: tarefa.eAniversario,
						dataOrdenacao: tarefa.data,
						cor: tarefa.cor,
						tipo: 'lembrete'
					})
				}
				else if (!tarefa.dataConcluiu || (dataConcluiu.getFullYear() < dataHoje.getFullYear())) {
					tarefa.data.setFullYear(dataHoje.getFullYear())
					tarefas.push({
						id: tarefa.id,
						nome: tarefa.nome,
						nomeFormatado,
						dataFormatada: convertDateTime(tarefa.data, 'às '),
						data: convertDateTime(tarefa.data),
						eAniversario: tarefa.eAniversario,
						dataOrdenacao: tarefa.data,
						cor: tarefa.cor,
						tipo: 'lembrete'
					})
				}


			})

			projetos.map((projeto) => {

				projeto.atividade.map((atividade) => {



					let tamanho = atividade.nome.length

					let nomeFormatado = ''

					for (var i = 0; i < tamanho; i += 15) {

						if (i > 0) nomeFormatado = nomeFormatado + `\n`;

						nomeFormatado = nomeFormatado + atividade.nome.slice(i, i + 15)

					}

					tarefas.push({
						id: atividade.id,
						nome: atividade.nome,
						nomeFormatado,
						dataInicial: convertDateTime(atividade.dataInicial),
						dataFinal: convertDateTime(atividade.dataFinal),
						dataOrdenacao: atividade.dataInicial,
						dataFormatada: convertDateTime(atividade.dataInicial, 'às '),
						prioridade: atividade.prioridade,
						observacao: atividade.observacao,
						cor: atividade.cor,
						tipo: 'atividade'
					})

				})
			})


			tarefas = tarefas.sort(function (a, b) {
				let x = a.dataOrdenacao;
				let y = b.dataOrdenacao;
				if (x < y) { return -1; }
				if (x > y) { return 1; }
				return 0;
			});

			return res.status(201).json({ tarefas })
		} catch (error) {
			return next(error)
		}
	}
)