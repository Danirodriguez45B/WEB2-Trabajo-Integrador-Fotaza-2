const { Publicacion, Archivo, Usuario, Comentario, Valoracion, Seguidor } = require('../models/index');
// aca muestro la home
exports.mostrarHome = async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll({
      attributes: ['id', 'titulo', 'descripcion', 'etiquetas', 'createdAt'],
      include: [
        { model: Usuario, attributes: ['username'] },
        { model: Archivo, as: 'Archivos' },
    { 
      model: Comentario, 
      as: 'Comentarios',
      include: [{ model: Usuario, attributes: ['username'] }] // Trae quién comentó
    },
    { model: Valoracion, as: 'Valoraciones' } // Trae los likes
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.render('home', { 
      publicaciones: publicaciones, 
      usuario: req.session.usuario || null 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el inicio');
  }
};

// aca muestra el formulario para subir foto
exports.mostrarFormularioSubir = (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/login');
  }
  res.render('createPost'); 
};

// aca hago guardar publicacion
exports.guardarPublicacion = async (req, res) => {
  try {
    const { titulo, descripcion, etiquetas } = req.body;
    const usuarioId = req.session.usuario.id;

    const nuevaPublicacion = await Publicacion.create({
      titulo: titulo,
      descripcion: descripcion,
      etiquetas: etiquetas || '',
      usuarioId: usuarioId
    });

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const urlImagen = `/uploads/${file.filename}`;
        await Archivo.create({
          url: urlImagen,
          publicacionId: nuevaPublicacion.id
        });
      }
    }
    res.redirect('/');
  } catch (error) {
    console.error('Error al guardar:', error);
    res.status(500).send('Error interno');
  }
};