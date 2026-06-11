const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const mainController = require('../controllers/mainController');
const postController = require('../controllers/postController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Rutas principales
router.get('/', mainController.mostrarHome);
router.get('/perfil/:username', mainController.verPerfilUsuario);
router.get('/publicacion/:id', mainController.verDetallePublicacion);
router.get('/buscar', mainController.buscarPublicaciones);

// Rutas de comentarios y valoraciones
router.post('/publicacion/:id/comentar', mainController.agregarComentario);
router.post('/publicacion/:id/valorar', mainController.valorarPublicacion); 
router.post('/usuario/:id/seguir', mainController.seguirUsuario);

// Rutas de Subida
router.get('/subir', postController.mostrarFormulario);
router.post('/subir', upload.array('imagenes', 5), postController.crearPost);

module.exports = router;