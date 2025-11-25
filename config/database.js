// ===============================
// CONFIGURACIÓN DE BASE DE DATOS
// ===============================
const mysql = require('mysql2/promise');

// Railway proporciona variables con prefijo MYSQL automáticamente
const config = {
    host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
    user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
    database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'registro_asistencia',
    port: parseInt(process.env.MYSQLPORT || process.env.DB_PORT || '3306')
};

const pool = mysql.createPool({
    ...config,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: process.env.DB_HOST && process.env.DB_HOST.includes('aivencloud') ? { rejectUnauthorized: false } : undefined
});// Verificar conexión
pool.getConnection()
    .then(connection => {
        console.log('✔ Conexión exitosa a MySQL');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Error al conectar con MySQL:', err.message);
        console.error('Variables:', process.env.DATABASE_URL ? 'DATABASE_URL OK' : `Host: ${process.env.DB_HOST}, User: ${process.env.DB_USER}`);
    });

module.exports = pool;
