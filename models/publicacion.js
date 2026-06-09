const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./usuario');

const Publicacion = sequelize.define('Publicacion', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: true },
  etiquetas: {              
    type: DataTypes.STRING, 
    allowNull: true 
  }
}, {
  tableName: 'publicaciones',
  timestamps: true
});

Publicacion.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = Publicacion;