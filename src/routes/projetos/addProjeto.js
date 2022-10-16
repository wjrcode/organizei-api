const Router = require('express').Router
const convertDateTime = require('../../helpers/convertDateTime')

module.exports = Router({ mergeParams: true }).post(
	'/projetos',
	async (req, res, next) => {
		try {
			const { nome, dataInicial, dataFinal, observacao, cor, atividades } = req.body
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

			try {
				atividades.map(async (atividade) => {

					await models.atividade.create({
						nome: atividade.nome,
						dataInicial: convertDateTime(atividade.dataInicial),
						observacao: atividade.observacao,
						dataFinal: convertDateTime(atividade.dataFinal),
						cor: atividade.cor,
						prioridade: atividade.prioridade,
						projetoId: projeto.id
					})
				})

			} catch (error) {

				await models.projeto.destroy({ where: { id: projeto.id } })
				return res.status(202).json({ valido: false, msg: 'Erro ao criar projeto!' })

			}

			return res.status(201).json({ id: projeto.id, valido: true, msg: 'Projeto criado com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)