const Router = require('express').Router
const convertDateTime = require('../../helpers/convertDateTimeApp')
const sequelize = require('sequelize')
//const convertDateTime = require('../../helpers/convertDateTime')

module.exports = Router({ mergeParams: true }).get(
	'/listas',
	async (req, res, next) => {
		try {
			const { models } = req.db

			const listas = await await models.lista.findAll({
				order: [['id', 'asc']],
				include: ['item'],
			})

			let tarefas = []

			// listas.map((lista) => {

			// 	lista.rotina.map((rotina)=>{

			// 	let tamanho = lista.nome.length

			// 	let nomeFormatado = ''

			// 	for (var i = 0; i < tamanho; i += 15) {

			// 		if (i > 0) nomeFormatado = nomeFormatado + `\n`;

			// 		nomeFormatado = nomeFormatado + lista.nome.slice(i, i + 15)

			// 	}

			// 	const dia = lista.dias.replace(/(\[)|(\])|(\ )/g, "")

			// 	const dias = dia.split(',')
			// 	tarefas.push({
			// 		id: lista.id,
			// 		idRotina: rotina.id,
			// 		nome: lista.nome,
			// 		nomeFormatado,
			// 		hora: convertDateTime(rotina.data),
			// 		dataFinal: convertDateTime(lista.dataFinal),
			// 		dataOrdenacao: rotina.data,
			// 		dataFormatada: convertDateTime(rotina.data, 'às '),
			// 		dias: dias,
			// 		cor: lista.cor,
			// 		tipo: 'lista'
			// 	})

			// })
			// })


			return res.status(201).json({ listas })
		} catch (error) {
			return next(error)
		}
	}
)