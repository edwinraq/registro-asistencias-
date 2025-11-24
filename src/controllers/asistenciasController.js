// ===============================
// CONTROLADOR DE ASISTENCIAS
// ===============================
const conexion = require('../../config/database');

// Obtener todas las asistencias (con filtro por fecha)
const obtenerAsistencias = (req, res) => {
    const { fecha } = req.query;
    let query = `
        SELECT a.*, i.nombres, i.apellidos, i.documento 
        FROM asistencias a
        INNER JOIN instructores i ON a.instructor_id = i.id
    `;

    const params = [];
    if (fecha) {
        query += ' WHERE a.fecha = ?';
        params.push(fecha);
    }

    query += ' ORDER BY a.fecha DESC, a.hora_entrada DESC';

    conexion.query(query, params, (err, results) => {
        if (err) {
            console.error('Error al obtener asistencias:', err);
            return res.status(500).json({ error: 'Error al obtener asistencias' });
        }
        res.json(results);
    });
};

// Registrar entrada de asistencia
const registrarEntrada = (req, res) => {
    const { instructor_id, fecha, hora_entrada } = req.body;

    if (!instructor_id) {
        return res.status(400).json({ error: 'instructor_id es requerido' });
    }

    const fechaActual = fecha || new Date().toISOString().split('T')[0];
    const horaActual = hora_entrada || new Date().toTimeString().split(' ')[0];

    // Verificar si ya existe una asistencia para hoy
    const checkQuery = 'SELECT * FROM asistencias WHERE instructor_id = ? AND fecha = ?';
    conexion.query(checkQuery, [instructor_id, fechaActual], (err, results) => {
        if (err) {
            console.error('Error al verificar asistencia:', err);
            return res.status(500).json({ error: 'Error al verificar asistencia' });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'Ya existe un registro de entrada para hoy' });
        }

        const insertQuery = 'INSERT INTO asistencias (instructor_id, fecha, hora_entrada, estado) VALUES (?, ?, ?, ?)';
        conexion.query(insertQuery, [instructor_id, fechaActual, horaActual, 'Registrada'], (err, result) => {
            if (err) {
                console.error('Error al registrar entrada:', err);
                return res.status(500).json({ error: 'Error al registrar entrada' });
            }
            res.json({
                success: true,
                message: 'Entrada registrada exitosamente',
                id: result.insertId
            });
        });
    });
};

// Registrar salida de asistencia
const registrarSalida = (req, res) => {
    const { id } = req.params;
    const { hora_salida } = req.body;

    const horaActual = hora_salida || new Date().toTimeString().split(' ')[0];

    const query = 'UPDATE asistencias SET hora_salida = ? WHERE id = ?';
    conexion.query(query, [horaActual, id], (err, result) => {
        if (err) {
            console.error('Error al registrar salida:', err);
            return res.status(500).json({ error: 'Error al registrar salida' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Asistencia no encontrada' });
        }
        res.json({
            success: true,
            message: 'Salida registrada exitosamente'
        });
    });
};

// Obtener asistencias de hoy
const obtenerAsistenciasHoy = (req, res) => {
    const fechaHoy = new Date().toISOString().split('T')[0];
    const query = `
        SELECT a.*, i.nombres, i.apellidos, i.documento 
        FROM asistencias a
        INNER JOIN instructores i ON a.instructor_id = i.id
        WHERE a.fecha = ?
        ORDER BY a.hora_entrada DESC
    `;

    conexion.query(query, [fechaHoy], (err, results) => {
        if (err) {
            console.error('Error al obtener asistencias de hoy:', err);
            return res.status(500).json({ error: 'Error al obtener asistencias' });
        }
        res.json(results);
    });
};

module.exports = {
    obtenerAsistencias,
    registrarEntrada,
    registrarSalida,
    obtenerAsistenciasHoy
};
