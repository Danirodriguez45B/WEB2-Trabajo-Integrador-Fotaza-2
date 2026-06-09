const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const { sequelize } = require('./models/index');

const app = express();

// configuracion de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Configuración de sesión
app.use(session({
  secret: process.env.SESSION_SECRET || 'secreto_fotaza',
  resave: false,
  saveUninitialized: false
}));


const PORT = process.env.PORT || 3000;

// aca arranco el servidor
async function arrancarServidor() {
  try {
    
    await sequelize.sync({ alter: true });
    console.log('✅ Base de datos sincronizada correctamente');
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
  }
}

arrancarServidor();