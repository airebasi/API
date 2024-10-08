const express = require('express');
const cors = require('cors');
const multer = require('multer');
//const mysql = require('mysql2');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const bodyParserXml = require('body-parser-xml');

const app = express();
const upload = multer();

bodyParserXml(bodyParser);  // Para procesar XML)

app.use(cors());                              // Middleware de terceros
app.use(bodyParser.json());                   // Middleware para JSON
app.use(bodyParser.text());                   // Middleware para texto
app.use(bodyParser.urlencoded({ extended: true })); // Middleware para URL-encoded
app.use(upload.none());                      // Middleware para parsear form-data
app.use(bodyParser.xml());                   // Middleware para parsear XML a JSON

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

//--------------------------------------NOTAS--------------------------------//
//Errores sincronos (try-catch)
//Errores asincronos (sync-await, callbacks, procceses) Errores asincronos (try-catch)
//Error de tiempo de ejecucion y de desarrollador (manejamos estos)
//Ya no se recomineda try-catch
//const [enCasoDeError,respuestaPositiva] ?=  \\NO ESTA DISPONIBLE EN TODAS LAS VERSIONES

//      GET     //
app.get('/alumno/:id?', async (req, res) => {
  try {
    const { id } = req.params;

    let consulta = 'SELECT * FROM Alumno';
    const params = [];

    if (id) {
      consulta += ' WHERE ID = ?';
      params.push(id);
    }

    const [results] = await connection.execute(consulta, params);

    if (results.length === 0) {
      return res.json({ error: "No se encontró el registro" });
    }

    res.json(results);
  } catch (err) {
    console.error('Error al consultar la base de datos:', err);
    res.json({ error: 'Error al consultar la base de datos', details: err.message });
  }
});

//    POST   //
app.post('/alumno', async (req, res) => {
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
app.delete('/alumno/:id', async (req, res) => {
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
app.put('/alumno/:id', async (req, res) => {
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


app.listen(3000, () => {
  console.log('Server Express escuchando en puerto 3000');
});

app.use((err,req,res,next)=>{

})