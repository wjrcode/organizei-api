module.exports = req => {
	let token = req.headers['x-access-token'] || req.headers['authorization']
	if (!token || token.length === 0) return ''
	if (token.startsWith('Bearer ')) {
		return token.slice(7, token.length)
	}
	return ''
}
