/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('dd_config', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		ukey: {
			type: DataTypes.STRING(64),
			allowNull: false,
			primaryKey: true
		},
		uname: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		sname: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		corpid: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		corpsecret: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		appkey: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		appsecret: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		agentid: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		chatid: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		access_token: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		token_begin_time: {
			type: DataTypes.DATE,
			allowNull: true
		},
		ticket: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		ticket_begin_time: {
			type: DataTypes.DATE,
			allowNull: true
		},
		url: {
			type: DataTypes.STRING(256),
			allowNull: true
		}
	}, {
		tableName: 'dd_config',
		timestamps: false
	});
};
