const express = require('express');
const cors = require('cors');
const multer = require('multer');
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
//Implementar POST Y DELETE (Para mañana)
//El POST debe validar que los tipos de datos concuerden (int,decimal,string,char,etc)
//Implementar DELETE
//Implementar PATCH/PUT (Para el miercoles, martes es de habilidades blandas)

//Despues del app.get, deberia de registrar una funcion ()=>{} mas en mi caso estropea las consultas

//SOLO SE POSICIONA NEXT SI SE VA A USAR (,next)
app.get('/alumno', async (req, res, next) => {
  try {
    const { ID, Nombre, ApellidoPaterno, ApellidoMaterno, Carrera } = req.query;
    let consulta = 'SELECT * FROM Alumno WHERE 1=1';
    const params = [];

    if (ID) {
      consulta += ' AND ID = ?';
      params.push(ID);
    }
    if (Nombre) {
      consulta += ' AND Nombre LIKE ?';
      params.push(`%${Nombre}%`);
    }
    if (ApellidoPaterno) {
      consulta += ' AND ApellidoPaterno LIKE ?';
      params.push(`%${ApellidoPaterno}%`);
    }
    if (ApellidoMaterno) {
      consulta += ' AND ApellidoMaterno LIKE ?';
      params.push(`%${ApellidoMaterno}%`);
    }
    if (Carrera) {
      consulta += ' AND Carrera LIKE ?';
      params.push(`%${Carrera}%`);
    }

    //Para debugging
    //console.log('Consulta SQL:', consulta);

    const [results] = await connection.execute(consulta, params);

    if (results.length === 0) {
      return res.json({ error: "No se encontró el registro" });
      next(err)
    }
    res.json(results);
  } catch (err) {
    console.error('Error al consultar la base de datos:', err);
    res.json({ error: 'Error al consultar la base de datos', details: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server Express escuchando en puerto 3000');
});

app.use((err,req,res,next)=>{

})