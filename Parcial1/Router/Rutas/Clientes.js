const express = require('express');
//const cors = require('cors');
//const multer = require('multer');
//const mysql = require('mysql2');
const mysql = require('mysql2/promise');


const router = express.Router();

//Prueba de conexion
let connection;

(async function connectToDatabase() {
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'Escuela',
    });
    console.log('Conexión a la base de datos establecida');
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
  }
})();

router.get('/', async (req, res) => {
  try {
    const [results] = await connection.execute('SELECT * FROM Alumno');
    res.json(results);
  } catch (err) {
    console.error('Error al consultar la base de datos:', err);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
});

// Obtener un alumno específico por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute('SELECT * FROM Alumno WHERE ID = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'No se encontró el registro' });
    }
    res.json(results[0]);
  } catch (err) {
    console.error('Error al consultar la base de datos:', err);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
});

//    POST   //
router.post('/', async (req, res) => {
  try {
    const { ID, Nombre, ApellidoPaterno, ApellidoMaterno, Carrera } = req.body;

    const [existing] = await connection.execute('SELECT * FROM Alumno WHERE ID = ?', [ID]);
    if (existing.length > 0) {
      return res.json({ error: 'El ID ya existe' });
    }

    const [result] = await connection.execute(
      'INSERT INTO Alumno (ID, Nombre, ApellidoPaterno, ApellidoMaterno, Carrera) VALUES (?, ?, ?, ?, ?)',
      [ID, Nombre, ApellidoPaterno, ApellidoMaterno, Carrera]
    );

    res.json({ message: 'Registro realizado'});
  } catch (err) {
    console.error('Error al insertar en la base de datos:', err);
    res.json({ error: 'Error al insertar en la base de datos', details: err.message });
  }
});

//    DELETE    //
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await connection.execute('DELETE FROM Alumno WHERE ID = ?', [id]);

    if (result.affectedRows === 0) {
      return res.json({ error: 'Registro no encontrado' });
    }

    res.json({ message: 'Registro eliminado con éxito' });
  } catch (err) {
    console.error('Error al eliminar de la base de datos:', err);
    res.json({ error: 'Error al eliminar de la base de datos', details: err.message });
  }
});

//    PUT/PACTH   //
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, ApellidoPaterno, ApellidoMaterno, Carrera } = req.body;

    if (!Nombre && !ApellidoPaterno && !ApellidoMaterno && !Carrera) {
      return res.json({ error: 'No se proporcionaron datos para actualizar' });
    }
    let consulta = 'UPDATE Alumno SET ';
    const params = [];

    if (Nombre) {
      consulta += 'Nombre = ?, ';
      params.push(Nombre);
    }
    if (ApellidoPaterno) {
      consulta += 'ApellidoPaterno = ?, ';
      params.push(ApellidoPaterno);
    }
    if (ApellidoMaterno) {
      consulta += 'ApellidoMaterno = ?, ';
      params.push(ApellidoMaterno);
    }
    if (Carrera) {
      consulta += 'Carrera = ?, ';
      params.push(Carrera);
    }

    consulta = consulta.slice(0, -2);
    consulta += ' WHERE ID = ?';
    params.push(id);

    const [result] = await connection.execute(consulta, params);

    if (result.affectedRows === 0) {
      return res.json({ error: 'Registro no encontrado' });
    }

    res.json({ message: 'Registro actualizado con éxito' });
  } catch (err) {
    console.error('Error al actualizar en la base de datos:', err);
    res.json({ error: 'Error al actualizar en la base de datos', details: err.message });
  }
});

module.exports = router;