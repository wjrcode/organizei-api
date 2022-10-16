const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define(
		'atividade',
		{
			id: { type: DataTypes.BIGINT, allowNull: false, unique: true, index: true, primaryKey: true, autoIncrement: true },
			nome: { type: DataTypes.STRING(45), allowNull: false },
			concluido: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
			dataInicial: { type: DataTypes.DATE, allowNull: false },
			dataFinal: { type: DataTypes.DATE, allowNull: false },
			observacao: { type: DataTypes.STRING(45), allowNull: false },
			cor: { type: DataTypes.BIGINT, allowNull: false },
			prioridade: { type: DataTypes.STRING(5), allowNull: false }
		},
		{
			tableName: 'atividades',
		}
	)
}