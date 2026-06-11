const { Usuario, Publicacion, Archivo } = require('../models/index');

async function seed() {
  try {
    console.log('🌱 Iniciando carga de datos...');

    const profe = await Usuario.create({ username: 'profe', email: 'profe@gmail.com', password: '123' });
    const alumno = await Usuario.create({ username: 'alumno', email: 'alumno@gmail.com', password: '123' });
    const usuario = await Usuario.create({ username: 'usuario', email: 'usuario@gmail.com', password: '123' });

    // Lista de publicaciones con su imagen correspondiente
    const datos = [
      { titulo: 'Clase de Programacion', desc: 'codigo.', tags: 'clase,profe', autor: profe.id, img: '/uploads/foto1.jpg' },
      { titulo: 'lobo programador', desc: 'el es un lobo programador!', tags: 'lobo,alumno', autor: alumno.id, img: '/uploads/foto2.png' },
      { titulo: 'Paisaje urbano', desc: 'Un dia cualquiera.', tags: 'ciudad,usuario', autor: usuario.id, img: '/uploads/foto3.jpg' }
    ];

    for (const d of datos) {
      const nuevoPost = await Publicacion.create({
        titulo: d.titulo,
        descripcion: d.desc,
        etiquetas: d.tags,
        usuarioId: d.autor
      });

      await Archivo.create({
        url: d.img, 
        publicacionId: nuevoPost.id
      });
    }

    console.log('✅ Base de datos iniciada con 3 usuarios y 3 imagenes de prueba.');
    process.exit();
  } catch (error) {
    console.error('❌ Error en el seed:', error);
    process.exit(1);
  }
}

seed();