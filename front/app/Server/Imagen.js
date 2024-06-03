const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.js');

const Imagen = sequelize.define('Imagen', {
  idImagen: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Imagen: {
    type: DataTypes.BLOB('long')
  },
  Tipo: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'imagen',
  timestamps: false
});

module.exports = Imagen;