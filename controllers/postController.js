const { Publicacion, Archivo, Comentario, Valoracion } = require('../models/index');

// Muestra el formulario para crear una nueva publicacion
exports.mostrarFormulario = (req, res) => {

  if (!req.session.usuario) {
    return res.redirect('/login');
  }
  res.render('createPost');
};

// guardo la publicacion nueva en postgres con multiples archivos reales y etiquetas
exports.crearPost = async (req, res) => {
  try {
    //  agrego 'etiquetas' que viene desde el formulario
    const { titulo, descripcion, etiquetas } = req.body;
    const usuarioId = req.session.usuario.id; // id del usuario logueado

    // creo la publicacion en la tabla 'publicaciones' (guardando las etiquetas directas)
    const nuevaPublicacion = await Publicacion.create({
      titulo: titulo,
      descripcion: descripcion,
      etiquetas: etiquetas || '', 
      usuarioId: usuarioId
    });

    // Si el usuario subio imagenes, las recorre y guarda cada una en la tabla 'archivos'
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // Guarda la ruta interna de la carpeta uploads
        const urlImagen = `/uploads/${file.filename}`;
        
        await Archivo.create({
          url: urlImagen,
          publicacionId: nuevaPublicacion.id
        });
      }
    }

    // aca se redirige a la Home para ver el cambio dinamico
    res.redirect('/');
  } catch (error) {
    console.error('Error al crear la publicación:', error);
    res.status(500).send('Error interno al guardar la publicación');
  }
};
exports.agregarComentario = async (req, res) => {
  try {
    if (!req.session.usuario) return res.redirect('/login');

    await Comentario.create({
      texto: req.body.comentario,
      publicacionId: req.params.publicacionId,
      usuarioId: req.session.usuario.id
    });
    res.redirect('back');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al comentar");
  }
};

exports.agregarValoracion = async (req, res) => {
  try {
    if (!req.session.usuario) return res.redirect('/login');

    await Valoracion.create({
      publicacionId: req.params.publicacionId,
      usuarioId: req.session.usuario.id
    });
    res.redirect('back');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al valorar");
  }
};