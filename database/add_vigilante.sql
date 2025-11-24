-- Agregar tipo de usuario 'vigilante'
USE registro_asistencia;

-- Modificar la tabla usuarios para incluir vigilante
ALTER TABLE usuarios MODIFY COLUMN tipo ENUM('admin', 'instructor', 'vigilante') NOT NULL DEFAULT 'instructor';

-- Crear tabla de vigilantes
CREATE TABLE IF NOT EXISTS vigilantes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  turno VARCHAR(50) DEFAULT 'Diurno',
  puesto VARCHAR(50) DEFAULT '1',
  usuario_id INT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertar usuario vigilante de prueba
INSERT INTO usuarios (usuario, contrasena, tipo) VALUES ('vigilante', '1234', 'vigilante');
INSERT INTO vigilantes (nombres, apellidos, turno, puesto, usuario_id) 
VALUES ('Emilio', 'García', 'Diurno', '1', LAST_INSERT_ID());
