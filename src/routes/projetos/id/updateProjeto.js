const Router = require('express').Router
const convertDateTime = require('../../../helpers/convertDateTime')

module.exports = Router({ mergeParams: true }).put(
	'/projetos/:id',
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { nome, dataInicial, observacao, dataFinal, cor } = req.body
			const { models } = req.db

			if (!id || id == 'null') return res.status(202).json({ valido: false, msg: 'ID não informado!' })
			if (!nome) return res.status(202).json({ valido: false, msg: 'Nome não informado!' })
			if (!dataInicial) return res.status(202).json({ valido: false, msg: 'Data inicial não informada!' })
			if (!observacao) return res.status(202).json({ valido: false, msg: 'Observação não informado!' })
			if (!dataFinal) return res.status(202).json({ valido: false, msg: 'Data final não informada!' })
			if (!cor) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			if (cor == 0) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			const exists = await models.projeto.findByPk(id)

			if (!exists) return res.status(202).json({ valido: false, msg: 'Projeto não encontrada!' })

			const projeto = await models.projeto.update(
				{
					nome,
					dataInicial: convertDateTime(dataInicial),
					observacao,
					dataFinal: convertDateTime(dataIdataFinalnicial),
					cor,
				},
				{ where: { id: id } })

			return res.status(201).json({ id: projeto.id, valido: true, msg: 'Projeto alterado com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)