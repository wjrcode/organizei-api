const Router = require('express').Router
const convertDateTime = require('../../helpers/convertDateTime')

module.exports = Router({ mergeParams: true }).post(
	'/atividades',
	async (req, res, next) => {
		try {
			const { nome, dataInicial, dataFinal, observacao, cor, prioridade, projetoId } = req.body
			const { models } = req.db

			if (!projetoId) return res.status(202).json({ valido: false, msg: 'ID do projeto não informado!' })
			if (!nome) return res.status(202).json({ valido: false, msg: 'Nome não informado!' })
			if (!dataInicial) return res.status(202).json({ valido: false, msg: 'Data inicial não informada!' })
			if (!observacao) return res.status(202).json({ valido: false, msg: 'Observação não informado!' })
			if (!dataFinal) return res.status(202).json({ valido: false, msg: 'Data final não informada!' })
			if (!prioridade) return res.status(202).json({ valido: false, msg: 'Prioridade não informada!' })
			if (!cor) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			if (cor == 0) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			const exists = await models.atividade.findOne({ where: { nome } })

			if (exists) return res.status(202).json({ valido: false, msg: 'Já existe uma atividade cadastrada com esse nome!' })

			const atividade = await models.atividade.create({
				nome,
				dataInicial: convertDateTime(dataInicial),
				observacao,
				dataFinal: convertDateTime(dataFinal),
				cor,
				prioridade, 
				projetoId
			})

			return res.status(201).json({ id: atividade.id, valido: true, msg: 'Atividade criada com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)