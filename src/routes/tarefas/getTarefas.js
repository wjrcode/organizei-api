const Router = require('express').Router
const convertDateTime = require('../../helpers/convertDateTimeApp')
//const convertDateTime = require('../../helpers/convertDateTime')

module.exports = Router({ mergeParams: true }).get(
	'/tarefas',
	async (req, res, next) => {
		try {
			const { models } = req.db

			const results = await await models.tarefa.findAll({
				order: [['data', 'asc']],
				where: { concluido: false }
			})

			const habitos = await await models.habito.findAll({
				order: [['hora', 'asc']],
				where: { concluido: false }
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
					data: convertDateTime(tarefa.data),
					observacao: tarefa.observacao,
					prioridade: tarefa.prioridade,
					cor: tarefa.cor,
					tipo: 'tarefa'
				})
			})

			habitos.map((tarefa) => {

				let tamanho = tarefa.nome.length

				let nomeFormatado = ''

				for (var i = 0; i < tamanho; i += 15) {

					if (i > 0) nomeFormatado = nomeFormatado + `\n`;

					nomeFormatado = nomeFormatado + tarefa.nome.slice(i, i + 15)

				}
				//console.log
				const dia = tarefa.dias.replace(/(\[)|(\])|(\ )/g, "")

				const dias = dia.split(',')
				tarefas.push({
					id: tarefa.id,
					nome: tarefa.nome,
					nomeFormatado,
					hora: convertDateTime(tarefa.hora),
					dias: dias,
					cor: tarefa.cor,
					tipo: 'habito'
				})
			})

			return res.status(201).json({ tarefas })
		} catch (error) {
			return next(error)
		}
	}
)