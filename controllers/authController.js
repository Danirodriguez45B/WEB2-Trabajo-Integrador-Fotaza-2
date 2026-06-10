// aca importo el modelo real de Usuario
const { Usuario } = require('../models/index');

// Muestro el formulario de registro
exports.mostrarRegistro = (req, res) => {
  res.render('registro'); 
};

// GUARDA EL USUARIO EN LA BASE DE DATOS REAL
exports.registrarUsuario = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Guardo los datos reales en postgre con sequelize
    await Usuario.create({
      username: username,
      email: email,
      password: password
    });

    //En vez de mandar un cartel de texto, lo mando al login
    res.redirect('/login');
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).send("Error al crear la cuenta en la base de datos");
  }
};

// aca muestra el formulario de login (renderiza el login.pug)
exports.mostrarLogin = (req, res) => {
  res.render('login'); 
};