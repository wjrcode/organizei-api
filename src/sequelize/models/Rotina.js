const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define(
		'rotina',
		{
			id: { type: DataTypes.BIGINT, allowNull: false, unique: true, index: true, primaryKey: true, autoIncrement: true },
			concluido: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
			data: { type: DataTypes.DATE, allowNull: false },
		},
		{
			tableName: 'rotinas',
		}
	)
}