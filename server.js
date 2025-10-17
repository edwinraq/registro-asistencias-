// Importaciones
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de conexión
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',           // tu usuario MySQL
    password: '',           // tu contraseña (si tienes)
    database: 'software_asistencia' // nombre exacto de tu base de datos
});

// Verificar conexión
conexion.connect(err => {
    if (err) {
        console.error('❌ Error al conectar con la base de datos:', err);
        return;
    }
    console.log('✅ Conexión exitosa con MySQL');
});

// Ruta de ejemplo para insertar instructores
app.post('/agregar', (req, res) => {
    const { nombre, correo, telefono } = req.body;

    const sql = 'INSERT INTO instructores (nombres,apellidos, correo,telefono,documento) VALUES (?, ?, ?)';
    conexion.query(sql, [nombre, correo, telefono], (err, result) => {
        if (err) {
            console.error('❌ Error al insertar:', err);
            res.status(500).send('Error al registrar el instructor');
            return;
        }
        console.log('✅ Instructor registrado correctamente');
        res.send('Instructor agregado correctamente');
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('🚀 Servidor corriendo en http://localhost:3000');
});

