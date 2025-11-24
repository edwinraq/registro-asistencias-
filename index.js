// ===============================
// SERVIDOR PRINCIPAL - REGISTRO DE ASISTENCIAS
// ===============================
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Importar conexión a la base de datos
require('./config/database');

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
