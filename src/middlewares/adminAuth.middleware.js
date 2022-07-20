module.exports = async (req, res, next) => {
	try {
		const { usuario } = req

		if (!usuario.admin)
			return res.status(500).send('Usuário sem permissão!')

		return next()
	} catch (error) {
		return res.status(500).send(error)
	}
}
