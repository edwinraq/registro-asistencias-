// ===============================
// CONTROLADOR DE AUTENTICACIÓN
// ===============================
const conexion = require('../../config/database');

// Login de usuario
const login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Usuario y contraseña requeridos'
        });
    }

    const query = 'SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?';
    conexion.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error en login:', err);
            return res.status(500).json({
                success: false,
                message: 'Error en el servidor'
            });
        }

        if (results.length > 0) {
            const usuario = results[0];
            res.json({
                success: true,
                message: 'Login exitoso',
                tipo: usuario.tipo,
                usuario: usuario.usuario
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Usuario o contraseña incorrectos'
            });
        }
    });
};

module.exports = { login };
