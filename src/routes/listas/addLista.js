const Router = require('express').Router

module.exports = Router({ mergeParams: true }).post(
	'/listas',
	async (req, res, next) => {
		try {
			const { nome, cor, itens } = req.body
			const { models } = req.db

			console.log(itens)

			if (!nome) return res.status(202).json({ valido: false, msg: 'Nome não informado!' })
			if (!cor) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })
			if (!itens || itens.length < 1) return res.status(202).json({ valido: false, msg: 'Itens não informados!' })

			if (cor == 0) return res.status(202).json({ valido: false, msg: 'Cor não informada!' })

			const exists = await models.lista.findOne({ where: { nome } })

			if (exists) return res.status(202).json({ valido: false, msg: 'Já existe uma lista cadastrada com esse nome!' })

			const lista = await models.lista.create({
				nome,
				cor,
				usuarioId: 1
			})

			try {
				itens.map(async (item) => {
					await models.item.create({
						nome: item.nome,
						listumId: lista.id
					})
				})
				
			} catch (error) {

				await models.lista.destroy({ where: { id: lista.id } })
				return res.status(202).json({ valido: false, msg: 'Erro ao criar lista!' })
				
			}
			

			return res.status(201).json({ id: lista.id, valido: true, msg: 'Lista criada com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)