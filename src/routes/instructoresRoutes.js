// ===============================
// RUTAS DE INSTRUCTORES
// ===============================
const express = require('express');
const router = express.Router();
const instructoresController = require('../controllers/instructoresController');

// GET /api/instructores - Obtener todos los instructores
router.get('/', instructoresController.obtenerInstructores);

// POST /api/instructores - Crear nuevo instructor
router.post('/', instructoresController.crearInstructor);

// GET /api/instructores/:id - Obtener un instructor por ID
router.get('/:id', instructoresController.obtenerInstructorPorId);

module.exports = router;
