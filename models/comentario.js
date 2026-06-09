const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comentario = sequelize.define('Comentario', {
  texto: { type: DataTypes.TEXT, allowNull: false }
}, {
  tableName: 'comentarios',
  timestamps: true
});

module.exports = Comentario;