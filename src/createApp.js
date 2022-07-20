const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const errorHandler = require('./helpers/errorHandler.js')
const router = require('./routes/createRouter.js')()

module.exports = ({ database }) =>
	express()
		.use(bodyParser.urlencoded({ extended: true }))
		.use(bodyParser.json())
		.use(cors())
		.use((req, res, next) => {
			req.base = `${req.protocol}://${req.get('host')}`
			req.db = database
			return next()
		})
		.use(router)
		.use(errorHandler)
