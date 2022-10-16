module.exports = (data, mensagem ='' ) => {
	if (!data) return null

	return `${data.getDate() <10 ? '0' : ''}${data.getDate()}/${data.getMonth()+1 <10 ? '0' : ''}${data.getMonth()+1}/${data.getFullYear()} ${mensagem}${data.getHours() <10 ? '0' : ''}${data.getHours()}:${data.getMinutes() <10 ? '0' : ''}${data.getMinutes()}`
	//return `${ano.substring(0,4)}-${mes}-${dia} ${ano.substring(5)}`
}
