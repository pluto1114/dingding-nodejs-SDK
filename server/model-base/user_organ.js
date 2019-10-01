/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_organ', {
		loginname: {
			type: DataTypes.STRING(40),
			allowNull: false,
			primaryKey: true
		},
		orgid: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		}
	}, {
		tableName: 'user_organ',
		timestamps: false
	});
};
