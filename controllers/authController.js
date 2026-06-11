// aca importo el modelo real de Usuario
const { Usuario } = require('../models/index');

// Muestro el formulario de registro
exports.mostrarRegistro = (req, res) => {
  res.render('registro'); 
};

// guarda el usuario en la base de datos real
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
    res.redirect('/auth/login');
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).send("Error al crear la cuenta en la base de datos");
  }
};

// aca muestra el formulario de login
exports.mostrarLogin = (req, res) => {
  res.render('login'); 
};

// Proceso de el inicio de sesion real
exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca si existe el usuario en postgre
    const user = await Usuario.findOne({ where: { email, password } });

    if (user) {
      // Guarda al usuario real en la sesion
      req.session.usuario = {
        id: user.id,
        username: user.username,
        email: user.email
      };
      return res.redirect('/');
    }
    
    res.send('<h3>Credenciales incorrectas</h3><a href="/login">Volver a intentar</a>');
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).send("Error en el servidor");
  }
};

// Cerrar Sesion
exports.logoutUsuario = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};