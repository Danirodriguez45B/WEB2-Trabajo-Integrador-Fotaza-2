DROP TABLE IF EXISTS valoraciones CASCADE;
DROP TABLE IF EXISTS comentarios CASCADE;
DROP TABLE IF EXISTS imagenes CASCADE;
DROP TABLE IF EXISTS publicaciones CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'usuario',
    estado VARCHAR(20) DEFAULT 'activo'
);

CREATE TABLE publicaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    etiquetas VARCHAR(255),
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE imagenes (
    id SERIAL PRIMARY KEY,
    publicacion_id INT NOT NULL,
    ruta_archivo VARCHAR(255) NOT NULL,
    licencia VARCHAR(50) NOT NULL,
    CONSTRAINT fk_publicacion FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id) ON DELETE CASCADE
);

CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    publicacion_id INT NOT NULL,
    usuario_id INT NOT NULL,
    contenido TEXT NOT NULL,
    CONSTRAINT fk_publicacion_comentario FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id) ON DELETE CASCADE,
    CONSTRAINT fk_usuario_comentario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE valoraciones (
    id SERIAL PRIMARY KEY,
    publicacion_id INT NOT NULL,
    usuario_id INT NOT NULL,
    voto INT NOT NULL,
    CONSTRAINT voto_unico UNIQUE (publicacion_id, usuario_id),
    CONSTRAINT fk_publicacion_voto FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id) ON DELETE CASCADE,
    CONSTRAINT fk_usuario_voto FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

INSERT INTO usuarios (username, email, password, rol, estado) VALUES
('admin_test', 'admin@correo.com', 'admin123', 'validador', 'activo'),
('juan_perez', 'juan@correo.com', 'user123', 'usuario', 'activo');