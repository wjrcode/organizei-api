const Router = require('express').Router

module.exports = Router({ mergeParams: true }).post(
	'/tarefas',
	async (req, res, next) => {
		try {
			const { nome, data, observacao, prioridade, cor } = req.body
			const { models } = req.db

			console.log('tarefinha')

			if (!nome) return res.status(202).json({ valido: false, msg: 'Nome não informado!' })
			if (!data) return res.status(202).json({valido: false, msg: 'Data não informado!'})
			if (!observacao) return res.status(202).json({valido: false, msg: 'Observação não informado!'})
			if (!prioridade) return res.status(202).json({valido: false, msg: 'Prioridade não informada!'})
			if (!cor) return res.status(202).json({valido: false, msg: 'Cor não informada!'})

			const exists = await models.tarefa.findOne({ where: { nome } })

			if (exists) {
				return res.status(202).json({valido: false, msg: 'Já existe um usuário cadastrado com esse e-mail!'})

			
			}

			//let formatter = new Intl.DateTimeFormat('pt-BR'/*, { timeZone: "America/Denver" }*/)


			const tarefa = await models.tarefa.create({
				nome,
				data : new Date(),//formatter.format(new Date(new Date().toISOString().replace('Z', ''))),
				observacao,
				prioridade,
				cor,
				usuarioId: 1
			})

			return res.status(201).json({ id: tarefa.id, valido: true, msg: 'Usuário criado com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)