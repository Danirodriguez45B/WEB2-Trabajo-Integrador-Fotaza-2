const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Seguidor = sequelize.define('Seguidor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
}, { tableName: 'seguidores', timestamps: true });

module.exports = Seguidor;