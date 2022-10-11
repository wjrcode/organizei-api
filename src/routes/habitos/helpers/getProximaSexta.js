module.exports = (date = new Date()) => {
	const dateCopy = new Date(date.getTime());

	const proximo = new Date(
		dateCopy.setDate(
			dateCopy.getDate() + ((7 - dateCopy.getDay() + 5) % 7 || 7),
		),
	);

	return proximo;
}
