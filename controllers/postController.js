const { Publicacion, Archivo, Comentario, Valoracion } = require('../models/index');

// Muestra el formulario para crear una nueva publicacion
exports.mostrarFormulario = (req, res) => {

  if (!req.session.usuario) {
    return res.redirect('/login');
  }
  res.render('createPost');
};