const express = require('express');
const router = express.Router();
// aca importo el controlador authController
const authController = require('../controllers/authController');

// Rutas de Registro
router.get('/registro', authController.mostrarRegistro);
router.post('/registro', authController.registrarUsuario);

// Rutas de Login
router.get('/login', authController.mostrarLogin);
router.post('/login', authController.loginUsuario);
router.get('/logout', authController.logoutUsuario);
module.exports = router;