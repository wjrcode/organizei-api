module.exports = (page, limit) =>
	Number.parseInt(page) > 1
		? (Number.parseInt(page) - 1) * Number.parseInt(limit)
		: 0
