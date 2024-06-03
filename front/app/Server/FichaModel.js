const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.js');

const Ficha = sequelize.define('Ficha', {
  idFicha: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Historia: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Trasfondo_idTrasfondo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  raza_idRaza: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clase_idClase: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imagen_idImagen: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'ficha',
  timestamps: false,
});

module.exports = Ficha;
