# Fotaza2 - Aplicacion de Fotografias

 Fotaza es una plataforma web dinamica diseñada para la creacion, intercambio y gestión de una comunidad activa de fotografos. Permite a los usuarios compartir su trabajo, gestionar perfiles, interactuar mediante valoraciones y comentarios

 **Link del Deploy1:** [Visitar Fotaza en https://web2-trabajo-integrador-fotaza-2.onrender.com

---

## Rutas y Endpoints Principales



| Ruta Base | Descripcion y Funcionalidad |
| :--- | :--- |
| **`/`** | **Home:** Pantalla principal donde se ven las fotos de la comunidad. |
| **`/buscar`** | **Buscador:** Seccion para buscar y filtrar las publicaciones/imagenes/etiquetas. |
| **`/perfil`** | **Perfiles:** Muestra los datos del usuario y maneja los seguidores. |
| **`/publicaciones`** | **Publicaciones:** Permite subir, ver, editar,poner comentarios o valoraciones de fotografias. |
| **`/auth`** | **Autenticacion:** Maneja el registro y login de usuarios. |

---

## Usuario de Prueba 

Para probar el funcionamiento del sistema se ofrece el siguiente usuario

* **👤 Usuario:** `profe@gmail.com`
* **🔑 Contraseña:** `123`

* **👤 Usuario:** `alumno@gmail.com`
* **🔑 Contraseña:** `123`

* **👤 Usuario:** `usuario@gmail.com`
* **🔑 Contraseña:** `123`

---

##  Tecnologias Utilizadas


* **express (v5.2.1):** Es el motor de nuestro servidor. Lo usamos como framework principal para levantar la aplicacion y gestionar todas las rutas de navegacion de forma rapida y ordenada.
* **sequelize (v6.37.8):** Un ORM (mapeador) que actua como puente entre nuestro codigo javascript y la base de datos, permitiendonos consultar tablas sin escribir SQL puro.
* **pg (v8.21.0):** El driver o conector oficial que hace posible que nuestra aplicacion de Node se comunique y hable directamente con PostgreSQL.
* **pug (v3.0.4):** Motor de plantillas que toma los datos del backend y los transforma de forma dinámica en las pantallas HTML que ve el usuario.
* **express-session (v1.19.0):** Middleware que permite al servidor recordar al usuario que inició sesión mientras navega por las distintas páginas de la web.
* **dotenv (v17.4.2):** Es nuestra herramienta de seguridad para la configuracion. Nos permite aislar datos sensibles, como contraseñas o puertos, fuera del codigo fuente, manteniendolos protegidos en archivos de entorno.

---

## Como instalar el proyecto

pasos para clonar el proyecto y configurarlo en tu computadora:

### 1️⃣ Clonar el Repositorio
Abri una terminal en tu computadora y descarga la rama de producción ejecutando:

Abrí GitHub Desktop.

Ve a File > Clone repository...

Selecciona la pestaña URL.

### En el campo Repository URL, pega el siguiente enlace:
[https://github.com/Danirodriguez45B/WEB2-Trabajo-Integrador-Fotaza-2.git](https://github.com/Danirodriguez45B/WEB2-Trabajo-Integrador-Fotaza-2.git)


Elige la carpeta donde quieras guardar el proyecto en tu computadora y haz clic en Clone.

``` 
### 2️⃣ Instalar las dependencias
Ingresa a la carpeta del proyecto e instala todos los paquetes necesarios de Node corriendo:

```bash
npm install
```

### 3️⃣ Configurar el entorno
Crea un archivo llamado exactamente .env en la raiz del proyecto y configura tus credenciales locales basandote en el orden de este ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario_postgres
DB_NAME=tu_base_de_datos
DB_PASSWORD=tu_contraseña_local
DB_PORT=5432
```

### 4️⃣ Poblar la base de datos (Opcional)
Ejecuta este comando si queres agregar datos de prueba en la base de datos para ver el funcionamiento del sistema.

```bash
npm run db:init
```

### 5️⃣ Iniciar el servidor
Una vez que hayas realizado todos los pasos anteriores, para levantar la aplicacion, simplemente ejecuta este comando y busca localhost:3000 en tu navegador:

```bash
npm start
```

---




