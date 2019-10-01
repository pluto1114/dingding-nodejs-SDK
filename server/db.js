const Sequelize = require('sequelize');

const uuid = require('node-uuid');

const config = require('./config');

console.log('init sequelize...');

function generateId() {
  return uuid.v4();
}

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  timezone:"+08:00",
  pool: {
    max: 6,
    min: 0,
    idle: 30000
  }
});

var exp = {
  sequelize:sequelize,
  dataTypes:Sequelize, 
  sync: () => {
    // only allow create ddl in non-production environment:
    if (process.env.NODE_ENV !== 'production') {
      return sequelize.sync({ force: true });
    } else {
      throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
    }
  }
};
exp.SELECT=sequelize.QueryTypes.SELECT
exp.generateId = generateId;
exp.pageSize=15
module.exports = exp;