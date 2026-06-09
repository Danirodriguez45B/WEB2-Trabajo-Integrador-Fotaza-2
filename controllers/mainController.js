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