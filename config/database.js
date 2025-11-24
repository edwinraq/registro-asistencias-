// ===============================
// CONFIGURACIÓN DE BASE DE DATOS
// ===============================
const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'registro_asistencia'
});

// Verificar conexión
conexion.connect(err => {
    if (err) {
        console.error('❌ Error al conectar con MySQL:', err);
        process.exit(1);
    }
    console.log('✔ Conexión exitosa a la base de datos registro_asistencia');
});

module.exports = conexion;
