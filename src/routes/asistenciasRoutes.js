// ===============================
// RUTAS DE ASISTENCIAS
// ===============================
const express = require('express');
const router = express.Router();
const asistenciasController = require('../controllers/asistenciasController');

// GET /api/asistencias - Obtener todas las asistencias (con filtro opcional por fecha)
router.get('/', asistenciasController.obtenerAsistencias);

// GET /api/asistencias/hoy - Obtener asistencias de hoy
router.get('/hoy', asistenciasController.obtenerAsistenciasHoy);

// POST /api/asistencias/entrada - Registrar entrada
router.post('/entrada', asistenciasController.registrarEntrada);

// PUT /api/asistencias/salida/:id - Registrar salida
router.put('/salida/:id', asistenciasController.registrarSalida);

module.exports = router;
