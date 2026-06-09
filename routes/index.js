const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const mainController = require('../controllers/mainController');
const postController = require('../controllers/postController');

router.get('/', mainController.mostrarHome);

// Rutas de Subida
router.get('/subir', postController.mostrarFormulario);
router.post('/subir', upload.array('imagenes', 5), postController.crearPost);