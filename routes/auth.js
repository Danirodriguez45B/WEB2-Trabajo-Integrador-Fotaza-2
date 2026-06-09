const express = require('express');
const router = express.Router();
// aca importo el controlador authController
const authController = require('../controllers/authController');

// Rutas de Registro
router.get('/registro', authController.mostrarRegistro);
router.post('/registro', authController.registrarUsuario);