const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Archivo = sequelize.define('Archivo', {
  url: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'archivos',
  timestamps: false
});

module.exports = Archivo;