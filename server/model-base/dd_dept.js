/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('dd_dept', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		parentid: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		auto_add_user: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		create_dept_group: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		sname: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		orgid: {
			type: DataTypes.STRING(32),
			allowNull: true
		},
		ukey: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'dd_dept',
		timestamps: false
	});
};
