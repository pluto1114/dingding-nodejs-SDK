/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('t_order_att', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		orderCode: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		url: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		type: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		size: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		orderStatus: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		mtime: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 't_order_att',
		timestamps: false
	});
};
