const Router = require('express').Router
const convertDateTime = require('../../../helpers/convertDateTime')

module.exports = Router({ mergeParams: true }).put(
	'/atividades/:id',
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { nome, dataInicial, observacao, dataFinal, cor, prioridade } = req.body
			const { models } = req.db

			if (!id || id == 'null') return res.status(202).json({ valido: false, msg: 'ID não informado!' })
			if (!nome) return res.status(202).json({ valido: false, msg: 'Nome não informado!' })
			if (!dataInicial) return res.status(202).json({ valido: false, msg: 'Data inicial não informada!' })
			if (!observacao) return res.status(202).json({ valido: false, msg: 'Observação não informado!' })
			if (!dataFinal) return res.status(202).json({ valido: false, msg: 'Data final não informada!' })
			if (!prioridade) return res.status(202).json({ valido: false, msg: 'Prioridade não informada!' })
			if (!cor) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			if (cor == 0) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			const exists = await models.atividade.findByPk(id)

			if (!exists) return res.status(202).json({ valido: false, msg: 'Atividade não encontrada!' })

			const atividade = await models.atividade.update(
				{
					nome,
					dataInicial: convertDateTime(dataInicial),
					observacao,
					dataFinal: convertDateTime(dataFinal),
					cor,
					prioridade
				},
				{ where: { id: id } })

			return res.status(201).json({ id: atividade.id, valido: true, msg: 'Atividade alterada com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)