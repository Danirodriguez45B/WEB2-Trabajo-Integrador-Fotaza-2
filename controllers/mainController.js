const { Op } = require('sequelize');
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

// busca publicaciones
exports.buscarPublicaciones = async (req, res) => {
  try {
    let { q, tipo } = req.query;
    
    if (!tipo) tipo = 'titulo';
    console.log(`--- BUSCANDO: q=${q}, tipo=${tipo} ---`);

    const searchTerm = `%${q}%`;
    let queryOptions = {
      include: [
        { model: Usuario, attributes: ['username'] },
        { model: Archivo, as: 'Archivos' },
        { model: Comentario, as: 'Comentarios' },
        { model: Valoracion, as: 'Valoraciones' }
      ],
      where: {}
    };

    if (tipo === 'Usuario') {
      queryOptions.include[0].where = { username: { [Op.iLike]: searchTerm } };
      queryOptions.include[0].required = true;
    } else if (tipo === 'tags') {
      queryOptions.where = { etiquetas: { [Op.iLike]: searchTerm } };
    } else {
      queryOptions.where = { titulo: { [Op.iLike]: searchTerm } };
    }

    const publicaciones = await Publicacion.findAll(queryOptions);
    
    // aca verifica cuantas encontro
    console.log(`--- RESULTADOS ENCONTRADOS: ${publicaciones.length} ---`);

    res.render('resultados', { 
      publicaciones: publicaciones, 
      usuario: req.session.usuario || null 
    });
  } catch (error) {
    console.error('Error al buscar:', error);
    res.status(500).send('Error en la búsqueda');
  }
};

// funcion perfil
exports.verPerfilUsuario = async (req, res) => {
  try {
    const username = req.params.username;
    const usuarioPerfil = await Usuario.findOne({ where: { username: username } });
    if (!usuarioPerfil) return res.status(404).send('Usuario no encontrado');
    
    const cantidadSeguidores = await Seguidor.count({ 
        where: { seguidoId: usuarioPerfil.id } 
    });

    // verifica si lo sigue
    let yaSigues = false;
    if (req.session.usuario) {
      const seguidor = await Seguidor.findOne({ 
        where: { seguidorId: req.session.usuario.id, seguidoId: usuarioPerfil.id } 
      });
      if (seguidor) yaSigues = true;
    }

    const publicaciones = await Publicacion.findAll({
      where: { usuarioId: usuarioPerfil.id },
      include: [
        { model: Usuario, attributes: ['username'] },
        { model: Archivo, as: 'Archivos' },
        { model: Comentario, as: 'Comentarios' },
        { model: Valoracion, as: 'Valoraciones' }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.render('perfil', { 
      usuarioPerfil, 
      publicaciones, 
      usuario: req.session.usuario || null,
      yaSigues,
      cantidadSeguidores 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el perfil');
  }
};
exports.verDetallePublicacion = async (req, res) => {
  try {
    const publicacionId = req.params.id;
    const usuarioId = req.session.usuario ? req.session.usuario.id : null;

    const post = await Publicacion.findByPk(publicacionId, {
      include: [
        { model: Usuario, attributes: ['username'] },
        { model: Archivo, as: 'Archivos' },
        { 
          model: Comentario, 
          as: 'Comentarios',
          include: [{ model: Usuario, attributes: ['username'] }] 
        },
        { model: Valoracion, as: 'Valoraciones' }
      ]
    });

    if (!post) return res.status(404).send('Publicación no encontrada');

    // Busca si el usuario actual ya dio una valoracion
    let miValoracion = null;
    if (usuarioId) {
      miValoracion = await Valoracion.findOne({ 
        where: { usuarioId, publicacionId } 
      });
    }

    res.render('detalle', { 
      post, 
      usuario: req.session.usuario || null, 
      miValoracion 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el detalle');
  }
};

// aca la funcion de comentarios
exports.agregarComentario = async (req, res) => {
  try {
    const { texto } = req.body;
    const usuarioId = req.session.usuario.id;
    const publicacionId = req.params.id;

    await Comentario.create({
      texto,
      usuarioId,
      publicacionId
    });

    res.redirect('/publicacion/' + publicacionId);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar el comentario');
  }
};
exports.valorarPublicacion = async (req, res) => {
  try {
    // valida si existe la sesion del usuario
    if (!req.session || !req.session.usuario) {
      // Si no esta logueado lo envia al login
      return res.redirect('/login'); 
    }

    const usuarioId = req.session.usuario.id;
    const publicacionId = req.params.id;
    const puntos = parseInt(req.body.puntos); 

    // valoracion
    await Valoracion.destroy({ where: { usuarioId, publicacionId } });
    await Valoracion.create({ usuarioId, publicacionId, puntos });

    res.redirect('/publicacion/' + publicacionId);
    
  } catch (error) {
    console.error('Error al procesar la valoración:', error);
    res.status(500).send('Error al procesar la valoración');
  }
};
exports.seguirUsuario = async (req, res) => {
  try {
    const seguidorId = req.session.usuario.id;
    const seguidoId = req.params.id;

    // Busca el usuario para tener su username
    const usuarioSeguido = await Usuario.findByPk(seguidoId);
    if (!usuarioSeguido) return res.redirect('/');

    if (seguidorId == seguidoId) {
        return res.redirect('/perfil/' + usuarioSeguido.username);
    }

    const existe = await Seguidor.findOne({ where: { seguidorId, seguidoId } });

    if (existe) {
      await Seguidor.destroy({ where: { seguidorId, seguidoId } });
    } else {
      await Seguidor.create({ seguidorId, seguidoId });
    }

    res.redirect('/perfil/' + usuarioSeguido.username);
    
  } catch (error) {
    console.error("Error al seguir:", error);
    res.status(500).send('Error al procesar la solicitud');
  }
};;