const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define(
		'habito',
		{
			id: { type: DataTypes.BIGINT, allowNull: false, unique: true, index: true, primaryKey: true, autoIncrement: true },
			nome: { type: DataTypes.STRING(45), allowNull: false },
			concluido: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
			dias: { type: DataTypes.STRING(21), allowNull: false },
			hora: { type: DataTypes.DATE, allowNull: false },
			cor: { type: DataTypes.STRING(6), allowNull: false },
		},
		{
			tableName: 'habitos',
		}
	)
}