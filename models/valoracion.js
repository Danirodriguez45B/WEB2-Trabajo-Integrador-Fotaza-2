const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Valoracion = sequelize.define('Valoracion', {
  puntos: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    defaultValue: 1 
  },

  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  publicacionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'valoraciones',
  timestamps: false
});

module.exports = Valoracion;