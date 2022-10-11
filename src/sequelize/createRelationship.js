module.exports = sequelize => {
	const {
		atividade,
		habito,
		rotina,
		item,
		lembrete,
		lista,
		projeto,
		tarefa,
		usuario
	} = sequelize.models

	usuario.hasMany(habito, {
		as: 'habito',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})
	habito.belongsTo(usuario)

	habito.hasMany(rotina, {
		as: 'rotina',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})
	rotina.belongsTo(habito)

	usuario.hasMany(lembrete, {
		as: 'lembrete',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})
	lembrete.belongsTo(usuario)

	usuario.hasMany(lista, {
		as: 'lista',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})
	lista.belongsTo(usuario)

	lista.hasMany(item, {
		as: 'item',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})
	item.belongsTo(lista)

	usuario.hasMany(projeto, {
		as: 'projeto',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})
	projeto.belongsTo(usuario)

	projeto.hasMany(atividade, {
		as: 'atividade',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})
	atividade.belongsTo(projeto)

	usuario.hasMany(tarefa, {
		as: 'tarefa',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})
	tarefa.belongsTo(usuario)
}
