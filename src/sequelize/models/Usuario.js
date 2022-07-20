const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	sequelize.define('usuario', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			unique: true,
			index: true,
			primaryKey: true,
			autoIncrement: true
		},
		nome: { type: DataTypes.STRING, allowNull: false },
		cidade: { type: DataTypes.STRING, allowNull: false },
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		senha: { type: DataTypes.STRING, allowNull: false },
		admin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		master: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		ativo: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	})
}
