const sequelize = require('../config/db');
const Usuario = require('./usuario');
const Publicacion = require('./publicacion');
const Archivo = require('./archivo');
const Comentario = require('./comentario');
const Valoracion = require('./valoracion');
const Seguidor = require('./seguidor');


module.exports = {
  sequelize,
  Usuario,
  Publicacion,
  Archivo,
  Comentario,
  Valoracion,
  Seguidor
};