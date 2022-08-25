const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define(
		'lembrete',
		{
			id: { type: DataTypes.BIGINT, allowNull: false, unique: true, index: true, primaryKey: true, autoIncrement: true },
			nome: { type: DataTypes.STRING(45), allowNull: false },
			eAniversario: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
			data: { type: DataTypes.DATE, allowNull: false },
			cor: { type: DataTypes.STRING(6), allowNull: false },
		},
		{
			tableName: 'lembretes',
		}
	)
}