const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define(
		'projeto',
		{
			id: { type: DataTypes.BIGINT, allowNull: false, unique: true, index: true, primaryKey: true, autoIncrement: true },
			nome: { type: DataTypes.STRING(45), allowNull: false },
			concluido: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
			dataInicial: { type: DataTypes.DATE, allowNull: false },
			dataFinal: { type: DataTypes.DATE, allowNull: false },
			cor: { type: DataTypes.STRING(6), allowNull: false },
			observacao: { type: DataTypes.STRING(45), allowNull: false },
			ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
		},
		{
			tableName: 'projetos',
		}
	)
}