# 📋 Sistema de Registro de Asistencias - SENA

Sistema web profesional para gestionar el registro de asistencias de instructores del SENA con autenticación por roles, código QR, control de entrada/salida y paneles administrativos.

## 🚀 Características

- ✅ **Login multi-rol** (Administrador, Vigilante, Instructor)
- ✅ **Gestión de instructores** (CRUD completo)
- ✅ **Panel de vigilante** para control de acceso
- ✅ **Registro de entrada y salida** de asistencias
- ✅ **Panel administrativo** para visualizar asistencias
- ✅ **Integración con código QR**
- ✅ **Consulta por fechas** y búsqueda avanzada
- ✅ **Base de datos MySQL** con relaciones
- ✅ **Diseño responsivo** con gradientes verdes SENA
- ✅ **Navegación intuitiva** entre módulos

## 📁 Estructura del Proyecto

```
proyectoaleja/
│
├── public/                    # Archivos frontend
│   ├── assets/               # Imágenes y recursos
│   │   └── foto sena.png
│   ├── css/                  # Estilos globales
│   │   └── style.css         # CSS unificado con tema verde
│   ├── iniciosesion.html     # Página de login con selector de roles
│   ├── administrador.html    # Panel administrador
│   ├── vigilante.html        # Panel vigilante (control de acceso)
│   ├── asistencias.html      # Lista de asistencias
│   ├── registros.html        # Registro entrada/salida
│   ├── creacionperfil.html   # Crear instructores
│   ├── pantallainstru.html   # Panel instructor
│   └── codigoqr.html         # Escaneo QR
│
├── src/                      # Código fuente backend
│   ├── controllers/          # Controladores
│   │   ├── authController.js
│   │   ├── instructoresController.js
│   │   └── asistenciasController.js
│   └── routes/               # Rutas API
│       ├── authRoutes.js
│       ├── instructoresRoutes.js
│       └── asistenciasRoutes.js
│
├── config/                   # Configuración
│   └── database.js           # Conexión MySQL
│
├── database/                 # Scripts SQL
│   └── registro_asistencia.sql
│
├── .env                      # Variables de entorno
├── index.js                  # Servidor principal
├── package.json              # Dependencias
└── README.md                 # Documentación

```

## 🛠️ Instalación en Nuevo PC

### Prerrequisitos

- **Node.js** (v16 o superior) - [Descargar](https://nodejs.org/)
- **XAMPP** (para MySQL/Apache) - [Descargar](https://www.apachefriends.org/)
- **Git** (opcional, para clonar) - [Descargar](https://git-scm.com/)

### Paso 1: Obtener el proyecto

**Opción A - Con Git:**
```bash
git clone https://github.com/alejandralaguna14/registro-asistencias-.git
cd registro-asistencias-
```

**Opción B - Sin Git:**
1. Descargar ZIP del repositorio
2. Extraer en la ubicación deseada
3. Abrir terminal en esa carpeta

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Configurar base de datos

**A. Iniciar XAMPP:**
- Abrir panel de control XAMPP
- Iniciar **Apache** y **MySQL**

**B. Crear base de datos:**
1. Ir a http://localhost/phpmyadmin
2. Crear base de datos llamada `registro_asistencia`
3. Importar el archivo `database/registro_asistencia.sql`

**C. Configurar usuarios y roles:**
1. En phpMyAdmin, abrir SQL
2. Copiar y ejecutar el contenido de `database/add_vigilante.sql`
   - O seguir las instrucciones en `database/INSTRUCCIONES_VIGILANTE.md`

### Paso 4: Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=registro_asistencia
PORT=3000
```

### Paso 5: Iniciar el servidor

```bash
node index.js
```

O con npm:
```bash
npm start
```

## 🌐 Uso

### Acceso al Sistema

Abrir navegador en: **http://localhost:3000**

### Credenciales por Rol

**👤 Administrador:**
- Usuario: `admin`
- Contraseña: `admin123`
- Funciones: Gestión completa de instructores, visualización de asistencias, reportes

**🛡️ Vigilante:**
- Usuario: `vigilante`
- Contraseña: `1234`
- Funciones: Registro de entrada/salida, búsqueda de instructores, control de acceso

**👨‍🏫 Instructor:**
- Usuario: (documento del instructor)
- Contraseña: (definida al crear perfil)
- Funciones: Ver historial propio, generar código QR

### Navegación

1. Seleccionar rol en la pantalla de login
2. Ingresar credenciales
3. Usar menú de navegación en cada panel:
   - 👥 Instructores
   - 📋 Asistencias
   - ✅ Registros
   - 📷 QR

## 📡 API Endpoints

### Autenticación
- `POST /api/login` - Iniciar sesión

### Instructores
- `GET /api/instructores` - Listar instructores
- `POST /api/instructores` - Crear instructor
- `GET /api/instructores/:id` - Obtener instructor por ID

### Asistencias
- `GET /api/asistencias` - Listar asistencias (con filtro por fecha)
- `GET /api/asistencias/hoy` - Asistencias del día actual
- `POST /api/asistencias/entrada` - Registrar entrada
- `PUT /api/asistencias/salida/:id` - Registrar salida

## 🗄️ Base de Datos

### Tablas principales:

- **usuarios**: Credenciales de acceso (admin, vigilante, instructor)
- **instructores**: Información de instructores (nombre, documento, correo, teléfono)
- **asistencias**: Registros de entrada/salida (fecha, hora_entrada, hora_salida)
- **vigilantes**: Información de vigilantes (turno, puesto)

### Relaciones:
- `instructores` → `usuarios` (1:1)
- `asistencias` → `instructores` (N:1)
- `vigilantes` → `usuarios` (1:1)

## 🔧 Tecnologías Utilizadas

### Backend
- **Node.js** v16+
- **Express** 5.1.0
- **MySQL2** 3.15.2
- **CORS** 2.8.5
- **Body-parser** 2.2.0
- **Dotenv** 16.3.1

### Frontend
- **HTML5** con semántica moderna
- **CSS3** con gradientes y animaciones
- **JavaScript** vanilla (ES6+)
- **QRCode.js** - Generación de códigos QR
- **html5-qrcode** - Escaneo de QR

### Base de Datos
- **MySQL** 5.7+ o **MariaDB** 10.4+

### Arquitectura
- **MVC** (Model-View-Controller)
- **REST API** para comunicación frontend-backend
- **Modular** con separación de rutas y controladores

## 🎨 Características de Diseño

- ✅ Tema verde pastel corporativo SENA
- ✅ Degradados suaves (#7FB77E → #6FA86F)
- ✅ Diseño responsivo para móviles
- ✅ Animaciones y transiciones suaves
- ✅ Toggle switches personalizados
- ✅ Navegación intuitiva con menú fijo
- ✅ Split-screen en login
- ✅ Selector visual de roles

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
# Verificar que MySQL esté corriendo en XAMPP
# Verificar que el puerto 3000 esté libre
netstat -ano | findstr :3000
```

### Error de conexión a base de datos
- Verificar credenciales en `.env`
- Asegurarse que MySQL esté iniciado en XAMPP
- Verificar que la base de datos `registro_asistencia` exista

### La página no carga cambios
- Limpiar caché del navegador: `Ctrl + Shift + Delete`
- Forzar recarga: `Ctrl + F5`
- Verificar que el servidor esté corriendo

## 📦 Dependencias del package.json

```json
{
  "dependencies": {
    "body-parser": "^2.2.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^5.1.0",
    "mysql2": "^3.15.2"
  }
}
```

## 🚀 Despliegue

Para desplegar en producción, considerar:
- Configurar variables de entorno seguras
- Usar HTTPS
- Implementar autenticación JWT
- Configurar límites de rate limiting
- Usar PM2 para mantener el servidor activo

## 📝 Licencia

ISC

## 👤 Autor

**Alejandra Laguna**
- GitHub: [@alejandralaguna14](https://github.com/alejandralaguna14)

## 🤝 Contribuciones

Este es un proyecto educativo. Para sugerencias o mejoras:
1. Fork el repositorio
2. Crear rama (`git checkout -b feature/mejora`)
3. Commit cambios (`git commit -m 'Agregar mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abrir Pull Request

---

**Nota:** Sistema desarrollado como proyecto educativo para el SENA - Servicio Nacional de Aprendizaje.

## ✅ Checklist de Instalación

- [ ] Node.js instalado y verificado (`node -v`)
- [ ] XAMPP instalado, Apache y MySQL corriendo
- [ ] Proyecto clonado o descargado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Base de datos creada en phpMyAdmin
- [ ] Archivo SQL importado
- [ ] Script de vigilante ejecutado
- [ ] Archivo `.env` creado y configurado
- [ ] Servidor iniciado (`node index.js`)
- [ ] Navegador abierto en http://localhost:3000
- [ ] Login exitoso con credenciales de admin o vigilante

¡Listo para usar! 🎉
