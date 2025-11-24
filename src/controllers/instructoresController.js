// ===============================
// CONTROLADOR DE INSTRUCTORES
// ===============================
const conexion = require('../../config/database');

// Obtener todos los instructores
const obtenerInstructores = (req, res) => {
    const query = 'SELECT * FROM instructores ORDER BY creado_en DESC';
    conexion.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener instructores:', err);
            return res.status(500).json({ error: 'Error al obtener instructores' });
        }
        res.json(results);
    });
};

// Crear nuevo instructor
const crearInstructor = (req, res) => {
    const { nombres, apellidos, correo, telefono, documento } = req.body;

    if (!nombres || !apellidos || !correo || !documento) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const query = 'INSERT INTO instructores (nombres, apellidos, correo, telefono, documento) VALUES (?, ?, ?, ?, ?)';
    conexion.query(query, [nombres, apellidos, correo, telefono, documento], (err, result) => {
        if (err) {
            console.error('Error al crear instructor:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'El correo o documento ya existe' });
            }
            return res.status(500).json({ error: 'Error al crear instructor' });
        }
        res.json({
            success: true,
            message: 'Instructor creado exitosamente',
            id: result.insertId
        });
    });
};

// Obtener un instructor por ID
const obtenerInstructorPorId = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM instructores WHERE id = ?';
    conexion.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener instructor:', err);
            return res.status(500).json({ error: 'Error al obtener instructor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Instructor no encontrado' });
        }
        res.json(results[0]);
    });
};

module.exports = {
    obtenerInstructores,
    crearInstructor,
    obtenerInstructorPorId
};
