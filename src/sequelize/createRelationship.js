module.exports = sequelize => {
	const {
		pxcab,
		pxsolic,
		cocab,
		cosolic,
	} = sequelize.models

	pxcab.hasMany(pxsolic, {
		as: 'pxsolic',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	pxsolic.belongsTo(pxcab)

	cocab.hasMany(cosolic, {
		as: 'cosolic',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	cosolic.belongsTo(cocab)
}
