const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define(
		'usuario',
		{
			id: { type: DataTypes.BIGINT, allowNull: false, unique: true, index: true, primaryKey: true, autoIncrement: true },
			nome: { type: DataTypes.STRING(45), allowNull: false },
			apelido: { type: DataTypes.STRING(15), allowNull: false },
			email: { type: DataTypes.STRING, allowNull: false, unique: true },
			senha: { type: DataTypes.STRING, allowNull: false },
		},
		{
			tableName: 'usuarios',
		}
	)
}