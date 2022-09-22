module.exports = data => {
	if (!data) return null

	const [dia, mes, ano] = data.split('/')
	return `${ano.substring(0,4)}-${mes}-${dia} ${ano.substring(5)}`
}
