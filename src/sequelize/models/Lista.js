const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define(
		'lista',
		{
			id: { type: DataTypes.BIGINT, allowNull: false, unique: true, index: true, primaryKey: true, autoIncrement: true },
			nome: { type: DataTypes.STRING(45), allowNull: false },
			cor: { type: DataTypes.STRING(6), allowNull: false },
		},
		{
			tableName: 'listas',
		}
	)
}