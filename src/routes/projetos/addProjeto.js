const Router = require('express').Router
const convertDateTime = require('../../helpers/convertDateTime')

module.exports = Router({ mergeParams: true }).post(
	'/projetos',
	async (req, res, next) => {
		try {
			const { nome, dataInicial, dataFinal, observacao, cor } = req.body
			const { models } = req.db


			if (!nome) return res.status(202).json({ valido: false, msg: 'Nome não informado!' })
			if (!dataInicial) return res.status(202).json({ valido: false, msg: 'Data inicial não informada!' })
			if (!observacao) return res.status(202).json({ valido: false, msg: 'Observação não informado!' })
			if (!dataFinal) return res.status(202).json({ valido: false, msg: 'Data final não informada!' })
			if (!cor) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			if (cor == 0) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			const exists = await models.projeto.findOne({ where: { nome } })

			if (exists) return res.status(202).json({ valido: false, msg: 'Já existe uma projeto cadastrada com esse nome!' })

			const projeto = await models.projeto.create({
				nome,
				dataInicial: convertDateTime(dataInicial),
				observacao,
				dataFinal: convertDateTime(dataFinal),
				cor,
				usuarioId: 1
			})

			return res.status(201).json({ id: projeto.id, valido: true, msg: 'Projeto criado com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)