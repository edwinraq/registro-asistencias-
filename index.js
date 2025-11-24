// ===============================
// SERVIDOR PRINCIPAL - REGISTRO DE ASISTENCIAS
// ===============================
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Importar conexión a la base de datos
const db = require('./config/database');

// Crear tablas automáticamente
(async () => {
    try {
        await db.query(`CREATE TABLE IF NOT EXISTS usuarios (id INT AUTO_INCREMENT PRIMARY KEY, usuario VARCHAR(50) NOT NULL UNIQUE, contrasena VARCHAR(255) NOT NULL, tipo ENUM('admin','vigilante','instructor') DEFAULT 'instructor', creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
        await db.query(`CREATE TABLE IF NOT EXISTS instructores (id INT AUTO_INCREMENT PRIMARY KEY, nombres VARCHAR(100) NOT NULL, apellidos VARCHAR(100) NOT NULL, correo VARCHAR(100) NOT NULL UNIQUE, telefono VARCHAR(20), documento VARCHAR(20) NOT NULL UNIQUE, qr_code TEXT, creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
        await db.query(`CREATE TABLE IF NOT EXISTS asistencias (id INT AUTO_INCREMENT PRIMARY KEY, instructor_id INT NOT NULL, fecha DATE NOT NULL, hora_entrada TIME, hora_salida TIME, estado ENUM('Pendiente','Registrada') DEFAULT 'Pendiente', KEY instructor_id (instructor_id))`);
        await db.query(`INSERT IGNORE INTO usuarios (usuario, contrasena, tipo) VALUES ('admin', '1234', 'admin'), ('vigilante', '1234', 'vigilante')`);
        await db.query(`INSERT IGNORE INTO instructores (nombres, apellidos, correo, telefono, documento) VALUES ('Edwin', 'Raquejo', 'edwinraquejo@gmail.com', '3154145891', '1252365925')`);
        console.log('✅ Tablas creadas/verificadas');
    } catch (err) {
        console.error('⚠️ Error tablas:', err.message);
    }
})();

// Importar rutas
const authRoutes = require('./src/routes/authRoutes');
const instructoresRoutes = require('./src/routes/instructoresRoutes');
const asistenciasRoutes = require('./src/routes/asistenciasRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// ===============================
// RUTAS PRINCIPALES
// ===============================

// Ruta raíz - Login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'iniciosesion.html'));
});

// Endpoint de prueba de conexión
app.get('/probarConexion', (req, res) => {
    res.json({
        success: true,
        message: '✔ Servidor funcionando correctamente'
    });
});

// ===============================
// API ROUTES
// ===============================
app.use('/api', authRoutes);
app.use('/api/instructores', instructoresRoutes);
app.use('/api/asistencias', asistenciasRoutes);

// ===============================
// MANEJO DE ERRORES 404
// ===============================
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        path: req.path
    });
});

// ===============================
// INICIAR SERVIDOR
// ===============================
app.listen(PORT, () => {
    console.log('═══════════════════════════════════════');
    console.log('🚀 Servidor ejecutándose');
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log('📁 Estructura organizada:');
    console.log('   - /public      → Archivos HTML, CSS, JS');
    console.log('   - /src         → Código fuente backend');
    console.log('   - /config      → Configuración DB');
    console.log('   - /database    → Scripts SQL');
    console.log('═══════════════════════════════════════');
});
