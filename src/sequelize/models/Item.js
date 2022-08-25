const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define(
		'item',
		{
			id: { type: DataTypes.BIGINT, allowNull: false, unique: true, index: true, primaryKey: true, autoIncrement: true },
			nome: { type: DataTypes.STRING(45), allowNull: false },
			concluido: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		},
		{
			tableName: 'itens',
		}
	)
}