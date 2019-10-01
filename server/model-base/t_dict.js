/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('t_dict', {
		code: {
			type: DataTypes.STRING(64),
			allowNull: false,
			primaryKey: true
		},
		key: {
			type: DataTypes.STRING(64),
			allowNull: false,
			unique: true
		},
		value: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		model: {
			type: DataTypes.STRING(128),
			allowNull: true
		}
	}, {
		tableName: 't_dict',
		timestamps: false
	});
};
