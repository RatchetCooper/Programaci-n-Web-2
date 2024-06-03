const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('misionboard', 'root', 'Maag201200.', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
