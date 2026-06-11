const sequelize = require('../config/db');
const Usuario = require('./usuario');
const Publicacion = require('./publicacion');
const Archivo = require('./archivo');
const Comentario = require('./comentario');
const Valoracion = require('./valoracion');
const Seguidor = require('./seguidor');

// aca defino las relaciones 
Usuario.hasMany(Publicacion, { foreignKey: 'usuarioId' });
Publicacion.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Publicacion.hasMany(Archivo, { foreignKey: 'publicacionId', as: 'Archivos' });
Archivo.belongsTo(Publicacion, { foreignKey: 'publicacionId' });

Publicacion.hasMany(Comentario, { foreignKey: 'publicacionId', as: 'Comentarios' });
Comentario.belongsTo(Publicacion, { foreignKey: 'publicacionId' });

Usuario.hasMany(Comentario, { foreignKey: 'usuarioId' });
Comentario.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Publicacion.hasMany(Valoracion, { foreignKey: 'publicacionId', as: 'Valoraciones' });
Valoracion.belongsTo(Publicacion, { foreignKey: 'publicacionId' });

Usuario.belongsToMany(Usuario, { 
  as: 'Seguidores', 
  through: Seguidor,
  foreignKey: 'seguidoId', 
  otherKey: 'seguidorId' 
});

Usuario.belongsToMany(Usuario, { 
  as: 'Siguiendo', 
  through: Seguidor, 
  foreignKey: 'seguidorId', 
  otherKey: 'seguidoId' 
});

module.exports = {
  sequelize,
  Usuario,
  Publicacion,
  Archivo,
  Comentario,
  Valoracion,
  Seguidor
};