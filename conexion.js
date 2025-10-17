// conexion.js
const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // tu usuario de MySQL
    password: '',       // si tu MySQL tiene contraseña, escríbela aquí
    database: 'software_asistencia' // nombre exacto de tu base de datos
});

conexion.connect((err) => {
    if (err) {
        console.error('❌ Error al conectar con la base de datos:', err);
        return;
    }
    console.log('✅ Conexión exitosa a la base de datos MySQL');
});

module.exports = conexion;
