module.exports = (error, req, res, next) => {
    console.error(error)
    const msg = typeof error == 'string' ? error : (error.mesage || 'Ocorreu um problema interno, entre em contato com o administrador!')
    return res.status(error.status || 500).json({ msg, detalhes: '' })
}